import { PrismaClient } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Event as EventTemplate } from "../../components";
import EventDetails from "../../components/EventDetails";
import { InterfaceEvent, mapPrismaEvent, prismaEventSelect } from "../../utils";

type Data = { event: InterfaceEvent };

const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps<Data> = async (context) => {
  if (typeof context.params?.id !== "string")
    return {
      notFound: true,
    };

  const prismaEvent = await prisma.event.findUnique({
    select: prismaEventSelect,
    where: { id: Number.parseInt(context.params.id) },
  });

  if (!prismaEvent)
    return {
      notFound: true,
    };

  return {
    props: { event: mapPrismaEvent(prismaEvent) },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    // paths: (await prisma.event.findMany({ select: { id: true } })).map(
    //   ({ id }) => ({ params: { id: id.toString() } })
    // ),
    paths: [], // Disable build time generation
    fallback: "blocking",
  };
};

const EventPage: NextPage<Data> = (props) => {
  return (
    <>
      <Head>
        <title>{props.event.title}</title>
        <meta
          name="description"
          content={props.event.description.substring(0, 400)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://events.study-campus.de/event/${props.event.id}`}
        />
        <meta
          property="og:image"
          content={`https://events.study-campus.de/api/image/48/${props.event.image}`}
        />
      </Head>
      <EventDetails event={props.event} EventTemlate={EventTemplate} />
    </>
  );
};

export default EventPage;
