import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";

const prisma = new PrismaClient();

const baseUrl = "https://events.study-campus.de";

function generateSiteMap({
  events,
  organisers,
}: {
  events: { id: number }[];
  organisers: { id: number }[];
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <changefreq>always</changefreq>
      </url>
      ${events
        .map(({ id }) => {
          return `
        <url>
            <loc>${baseUrl}/event/${id}</loc>
        </url>
      `;
        })
        .join("")}
      ${organisers
        .map(({ id }) => {
          return `
        <url>
            <loc>${baseUrl}/organiser/${id}</loc>
        </url>
      `;
        })
        .join("")}
    </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const data = {
    events: await prisma.event.findMany({ select: { id: true } }),
    organisers: await prisma.organiser.findMany({
      select: { id: true },
      // Only select organisers that at least once listed an event.
      where: { events: { some: { id: { gt: 0 } } } },
    }),
  };

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
