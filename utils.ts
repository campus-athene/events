import { Event as PrismaEvent, Organiser } from "@prisma/client";

export type InterfaceEvent = {
  id: number;
  title: string;
  organiser: { id: number; name: string };
  date: number;
  eventType: string;
  venue: string | null;
  venueAddress: string | null;
  venuePlaceId: string | null;
  price: string | null;
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
  venueData: true,
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

export const mapPrismaEvent = (e: PrismaSelectedEvent): InterfaceEvent => {
  const venueData = e.venueData && JSON.parse(e.venueData);
  return {
    ...e,
    date: e.date.getTime(),
    venueAddress: venueData && venueData["formatted_address"],
    venuePlaceId: venueData && venueData["place_id"],
  };
};
