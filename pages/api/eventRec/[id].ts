import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  InterfaceEvent,
  mapPrismaEvent,
  noPastFilter,
  prismaEventSelect,
  takeEventsPerRow,
} from "../../../utils";

const prisma = new PrismaClient();

export type ResponseBody = {
  event: InterfaceEvent;
  sameOrg: InterfaceEvent[];
  similar: InterfaceEvent[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (typeof req.query.id !== "string") {
    res.status(404).end(); // 404 Not Found
    return;
  }

  const event = await prisma.event.update({
    data: { clicks: { increment: 1 } },
    select: prismaEventSelect,
    where: { id: Number.parseInt(req.query.id) },
  });

  if (!event) {
    res.status(404).end(); // 404 Not Found
    return;
  }

  const [sameOrg, similar] = (
    await Promise.all([
      prisma.event.findMany({
        orderBy: { clicks: "desc" },
        select: prismaEventSelect,
        take: takeEventsPerRow,
        where: {
          AND: [
            {
              organiserId: event.organiser.id,
            },
            {
              NOT: {
                id: event.id,
              },
            },
            noPastFilter,
          ],
        },
      }),
      prisma.event.findMany({
        orderBy: { clicks: "desc" },
        select: prismaEventSelect,
        take: takeEventsPerRow,
        where: {
          AND: [
            {
              NOT: {
                organiserId: event.organiser.id,
              },
            },
            { eventType: event.eventType },
            noPastFilter,
          ],
        },
      }),
    ])
  ).map((g) => g.map(mapPrismaEvent));

  res.json({
    event: mapPrismaEvent(event),
    sameOrg,
    similar,
  });

  // Non-blocking, the response has already been sent
  await prisma.eventClick.create({
    data: {
      page: "/api/eventRec/[id]",
      arg: event.id.toString(),
      sid: req.cookies["sid"],
    },
  });
}
