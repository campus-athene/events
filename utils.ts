import { Event as PrismaEvent, Organiser } from "@prisma/client";

export type InterfaceEvent = {
  id: number;
  title: string;
  organiser: { id: number; name: string };
  date: number;
  eventType: string;
  venue: string | null;
  price: string;
  desc: string;
  image: string;
};

export const prismaEventSelect = {
  id: true,
  title: true,
  organiser: {
    select: {
      id: true,
      name: true,
    },
  },
  date: true,
  eventType: true,
  venue: true,
  price: true,
  desc: true,
  image: true,
};

type PrismaSelectedEvent = Pick<
  PrismaEvent & {
    organiser: Pick<
      Organiser,
      keyof typeof prismaEventSelect["organiser"]["select"]
    >;
  },
  keyof typeof prismaEventSelect
>;

/** How many events to pull from database for every row. */
export const takeEventsPerRow = 12;

export const mapPrismaEvent = (e: PrismaSelectedEvent): InterfaceEvent => ({
  ...e,
  date: e.date.getTime(),
});
