import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  mapPrismaEvent,
  prismaEventSelect,
  takeEventsPerRow,
} from "../../utils";

const prisma = new PrismaClient();

export type ResponseBody = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (typeof req.query.id !== "string") {
    res.status(404).end(); // 404 Not Found
    return;
  }

  const event = await prisma.event.findUnique({
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
          organiserId: event.organiser.id,
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
          ],
        },
      }),
    ])
  ).map((g) => g.map(mapPrismaEvent));

  res.json({
    event,
    sameOrg,
    similar,
  });
  return;
}
