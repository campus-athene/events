import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Event as DefaultEventTemplate } from "../../components";
import EventDetails from "../../components/EventDetails";
import EventModal from "../../components/EventModal";
import { Event, getEventById } from "../../dummyData";

const EventPage: NextPage = () => {
  const { query } = useRouter();

  const event =
    typeof query.id === "string"
      ? getEventById(Number.parseInt(query.id))
      : null;

  const [openEvent, setOpenEvent] = useState<Event | null>(null);

  if (!event) return null;

  const EventTemplate = (props: { event: Event }) => (
    <DefaultEventTemplate
      event={event}
      onClick={(e) => {
        e.preventDefault();
        setOpenEvent(event);
      }}
    />
  );

  return (
    <>
      <EventDetails event={event} EventTemlate={EventTemplate} />
      <EventModal event={openEvent} setEvent={setOpenEvent} />
    </>
  );
};

export default EventPage;
