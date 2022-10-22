import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  InterfaceEvent,
  mapPrismaEvent,
  noPastFilter,
  prismaEventSelect as select,
} from "../../utils";

const prisma = new PrismaClient();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ highlights: InterfaceEvent[] }>
) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.json({
    highlights: (
      await prisma.event.findMany({
        orderBy: { clicks: "desc" },
        select,
        take: 6,
        where: noPastFilter,
      })
    ).map(mapPrismaEvent),
  });
};

export default handler;
