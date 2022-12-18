import { Prisma, PrismaClient } from "@prisma/client";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getNoPastFilter,
  InterfaceEvent as Event,
  InterfaceEvent,
  mapPrismaEvent,
  prismaEventSelect,
  takeEventsPerRow,
} from "../../utils";

export type HomePageData = {
  highlights: Event[];
  dateRanges: {
    name: string;
    events: Event[];
  }[];
  categories: { name: string; events: Event[] }[];
};

const prisma = new PrismaClient();

export const getHomeData = async (): Promise<HomePageData> => {
  const now = moment();

  const select = prismaEventSelect;
  const take = takeEventsPerRow;
  const noPastFilter = getNoPastFilter(now.toDate());

  /**
   * Helper function to filter for values not null or undefined. null and undefined are excluded from type of returned elements.
   * @param value
   * @returns
   */
  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  async function awaitAll<TResult>(
    promises: Promise<TResult>[]
  ): Promise<TResult[]> {
    return (await Promise.allSettled(promises))
      .map((r) => {
        if (r.status === "fulfilled") return r.value;
        console.warn(r.reason);
        return null;
      })
      .filter(notEmpty);
  }

  return {
    highlights: (
      await prisma.event.findMany({
        orderBy: { clicks: "desc" },
        select,
        take: 6,
        where: noPastFilter,
      })
    ).map(mapPrismaEvent),
    dateRanges: (
      await awaitAll(
        [
          {
            name: "Heute",
            from: now.clone(),
            to: now.clone().endOf("day"),
          },
          {
            name: "Morgen",
            from: now.clone().add(1, "day").startOf("day"),
            to: now.clone().add(1, "day").endOf("day"),
          },
          ...(now.isoWeekday() <= 5
            ? [
                {
                  name: "Diese Woche",
                  from: now.clone().startOf("week"),
                  to: now.clone().endOf("week"),
                },
              ]
            : []),
          {
            name: "Nächste Woche",
            from: now.clone().add(1, "week").startOf("week"),
            to: now.clone().add(1, "week").endOf("week"),
          },
        ].map(async ({ name, from, to }) => ({
          name,
          events: (
            await prisma.event.findMany({
              orderBy: { clicks: "desc" },
              select,
              take,
              where: { date: { gte: from.toDate(), lt: to.toDate() } },
            })
          ).map(mapPrismaEvent),
        }))
      )
    ).filter((r) => r.events.length),
    categories: (
      await awaitAll(
        (
          [
            {
              name: "Workshops",
              where: { eventType: "Workshop" },
            },
            {
              name: "Präsenz",
              where: {
                online: false,
              },
            },
            {
              name: "Kostenlos",
              where: { price: null },
            },
            {
              name: "Hochschulgruppen",
              where: {
                organiser: { group: "Hochschulgruppe" },
              },
            },
            {
              name: "Fachschaften",
              where: {
                organiser: { group: "Fachschaft" },
              },
            },
            {
              name: "Exkursionen",
              where: { eventType: "Exkursion" },
            },
            {
              name: "Online",
              where: { online: true },
            },
            ...(
              await prisma.organiser.findMany({
                orderBy: { events: { _count: "desc" } },
                select: { id: true, name: true },
                where: {
                  events: {
                    some: noPastFilter,
                  },
                },
              })
            ).map((o) => ({ name: o.name, where: { organiserId: o.id } })),
          ] as { name: string; where: Prisma.EventWhereInput }[]
        ).map(async ({ name, where }) => ({
          name,
          events: (
            await prisma.event.findMany({
              orderBy: { clicks: "desc" },
              select,
              take,
              where: {
                ...noPastFilter,
                ...where,
              },
            })
          ).map(mapPrismaEvent),
        }))
      )
    ).filter((e) => e.events.length),
  };
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ highlights: InterfaceEvent[] }>
) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.json(await getHomeData());
};

export default handler;
