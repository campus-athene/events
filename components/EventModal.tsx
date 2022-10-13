import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Event as DefaultEventTemplate } from ".";
import { InterfaceEvent as Event } from "../utils";
import EventDetails from "./EventDetails";

const EventModal = (props: {
  event: Event | null;
  setEvent: Dispatch<SetStateAction<Event | null>>;
}) => {
  const isOpen = !!props.event;

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (!props.event) return null;

  const EventTemplate = (templateProps: { event: Event }) => (
    <DefaultEventTemplate
      event={templateProps.event}
      onClick={(e) => {
        e.preventDefault();
        props.setEvent(templateProps.event);
        scrollRef.current?.scrollTo(0, 0);
      }}
    />
  );

  return (
    <div
      className="bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 mx-auto my-0 overflow-auto z-20"
      onClick={() => props.setEvent(null)}
      ref={scrollRef}
    >
      <div
        className="mx-auto my-16 bg-white rounded-xl overflow-hidden"
        style={{ width: "60rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <EventDetails event={props.event} EventTemlate={EventTemplate} />
      </div>
    </div>
  );
};

export default EventModal;
