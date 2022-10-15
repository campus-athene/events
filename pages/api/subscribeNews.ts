import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body || typeof req.body.email !== "string") {
    res.status(400).end(); // 400 Bad Request
    return;
  }

  await prisma.eventNewsletter.create({
    data: {
      email: req.body.email,
    },
  });

  res.status(204).end(); // 204 No Content
};

export default handler;
