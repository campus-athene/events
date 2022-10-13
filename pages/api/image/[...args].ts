import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { join } from "path/posix";
import { createClient } from "webdav";

const prisma = new PrismaClient();

if (!process.env.STORAGE_URL) throw new Error("STORAGE_URL was not specified.");

const webdav = createClient(process.env.STORAGE_URL, {
  maxBodyLength: 1024 * 1024 * 10,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { args } = req.query;
  if (!Array.isArray(args)) {
    res.status(400).end(); // 400 Bad Request
    return;
  }
  const [_resolution, id] = args;

  const metaDataPromise = prisma.image.findUnique({
    select: { mimeType: true },
    where: { id },
  });

  const stream = webdav.createReadStream(join("/image-upload", id));

  const metaData = await metaDataPromise;
  if (!metaData) {
    res.status(404).end(); // 404 Not Found
    return;
  }

  res.status(200);
  res.setHeader("Content-Type", metaData.mimeType);

  stream.pipe(res);
};

export const config: PageConfig = {
  api: {
    responseLimit: false,
  },
};

export default handler;
