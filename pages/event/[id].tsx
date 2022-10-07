import { PrismaClient } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { Event as DefaultEventTemplate } from "../../components";
import EventDetails from "../../components/EventDetails";
import EventModal from "../../components/EventModal";
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
    paths: (await prisma.event.findMany({ select: { id: true } })).map(
      ({ id }) => ({ params: { id: id.toString() } })
    ),
    fallback: "blocking",
  };
};

const EventPage: NextPage<Data> = (props) => {
  const [openEvent, setOpenEvent] = useState<InterfaceEvent | null>(null);

  const EventTemplate = (props: { event: InterfaceEvent }) => (
    <DefaultEventTemplate
      event={props.event}
      onClick={(e) => {
        e.preventDefault();
        setOpenEvent(props.event);
      }}
    />
  );

  return (
    <>
      <EventDetails event={props.event} EventTemlate={EventTemplate} />
      <EventModal event={openEvent} setEvent={setOpenEvent} />
    </>
  );
};

export default EventPage;
