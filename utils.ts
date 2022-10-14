import { Event as PrismaEvent, Organiser, Prisma } from "@prisma/client";

export type InterfaceEvent = {
  id: number;
  title: string;
  organiser: { id: number; name: string; socialEmail: string | null };
  date: number;
  online: boolean;
  eventType: string;
  venue: string | null;
  venueAddress: string | null;
  venuePlaceId: string | null;
  registrationDeadline: number | null;
  registrationLink: string | null;
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
      socialEmail: true,
    },
  },
  date: true,
  online: true,
  eventType: true,
  venue: true,
  venueData: true,
  registrationDeadline: true,
  registrationLink: true,
  price: true,
  desc: true,
  image: true,
};

export const noPastFilter: Prisma.EventWhereInput = {
  AND: [
    {
      date: { gte: new Date() },
      OR: [
        { registrationDeadline: null },
        { registrationDeadline: { gte: new Date() } },
      ],
    },
  ],
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
    registrationDeadline: e.registrationDeadline?.getTime() || null,
  };
};
