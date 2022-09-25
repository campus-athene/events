import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Event as DefaultEventTemplate, EventGroup } from "./Components";
import dummyData, {
  Event,
  event1,
  event2,
  event3,
  event4,
  event5,
  getEventById,
} from "./dummyData";

const EventDetails = (props: {
  event: Event;
  EventTemlate: ({ event }: { event: Event }) => JSX.Element;
}) => {
  const Event = props.EventTemlate || DefaultEventTemplate;
  const [fav, setFav] = useState(false);

  const sameOrgEvents = dummyData.events.filter(
    (e) =>
      e.organiser.id === props.event.organiser.id && e.id !== props.event.id
  );

  return (
    <>
      <div
        className="grid grid-cols-5 items-stretch justify-items-stretch"
        style={{ gridTemplateRows: "16rem max-content" }}
      >
        <img
          className="col-span-2 object-cover"
          src={props.event.image}
          alt=""
        />
        <div className="bg-neutral-200 col-span-3 p-10 text-right">
          <div className="font-medium text-2xl">{props.event.title}</div>
          <Link
            className="block hover:underline mb-4 text-neutral-500"
            to={`/organiser/${props.event.organiser.id}`}
          >
            {props.event.organiser.name}
          </Link>
          <div className="">{props.event.venue}</div>
          <div>{props.event.date}</div>
          <div className="flex-grow" />
          <div className="flex gap-10 justify-end mt-6">
            <div />
            <button
              className={fav ? "text-red-700" : "text-neutral-600"}
              onClick={() => setFav(!fav)}
            >
              <FontAwesomeIcon
                className="h-6"
                icon={fav ? faSolidHeart : faRegularHeart}
              />
            </button>
            <button className="text-neutral-600">
              <FontAwesomeIcon className="h-6" icon={faShareFromSquare} />
            </button>
            <button className="bg-violet p-2 px-8 rounded-xl text-white">
              Anmelden
            </button>
          </div>
          {/* <Link
                className="bg-slate-400 p-2 rounded-xl text-center"
                to={`/organiser/${event.organiser.id}`}
              >
                Veranstalter kontaktieren
              </Link> */}
        </div>
      </div>
      <div
        className="gap-10 grid grid-cols-5 items-stretch justify-items-stretch p-10 pb-0"
        style={{ gridTemplateRows: "20.5rem max-content" }}
      >
        <div className="col-span-3 row-span-2">
          <p>
            {props.event.desc
              .split("\n")
              .filter((d) => d)
              .map((d, i) => (
                <p className="mb-2" key={i}>
                  {d}{" "}
                </p>
              ))}
          </p>
        </div>
        <img
          alt={props.event.venue}
          className="col-span-2 object-cover"
          src="https://tile.openstreetmap.org/16/34344/22261.png"
        />
        {/* <iframe
              className="col-span-2 h-96 bg-slate-400"
              title="Veranstaltungsort"
              frameBorder="0"
              src="https://www.bing.com/maps/embed?h=400&amp;w=500&amp;cp=49.999795027127405~4022.999725341797&amp;lvl=11&amp;typ=d&amp;sty=r&amp;src=SHELL&amp;FORM=MBEDV8"
              scrolling="no"
            ></iframe> */}
        {/* <div style="white-space: nowrap; text-align: center; width: 500px; padding: 6px 0;">
              <a id="largeMapLink" target="_blank" href="https://www.bing.com/maps?cp=49.999795027127405~4022.999725341797&amp;sty=r&amp;lvl=11&amp;FORM=MBEDLD">View Larger Map</a> &nbsp; | &nbsp;
              <a id="dirMapLink" target="_blank" href="https://www.bing.com/maps/directions?cp=49.999795027127405~4022.999725341797&amp;sty=r&amp;lvl=11&amp;rtp=~pos.49.999795027127405_4022.999725341797____&amp;FORM=MBEDLD">Get Directions</a>
            </div> */}
        <div
          className="bg-neutral-200 col-start-4 col-span-2 gap-2 grid p-4 rounded-xl self-start"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div className="text-neutral-600">Adresse:</div>
          <div>{props.event.venue}</div>
          <div className="text-neutral-600">Preis:</div>
          <div>{props.event.price}</div>
        </div>
      </div>
      <div className="pb-10">
        {!!sameOrgEvents.length && (
          <EventGroup title="Weitere Events von diesem Veranstalter">
            {sameOrgEvents.map((e) => (
              <Event key={e.id} event={e} />
            ))}
          </EventGroup>
        )}
        <EventGroup title="Ähnliche Events, die Dich interessieren könnten">
          {[event3, event4, event5, event1, event2]
            .filter((e) => e.id !== props.event.id)
            .map((e) => (
              <Event key={e.id} event={e} />
            ))}
        </EventGroup>
      </div>
    </>
  );
};

export const EventModal = ({ event, setEvent }) => {
  const isOpen = !!event;

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const EventTemplate = ({ event }) => (
    <DefaultEventTemplate
      event={event}
      onClick={(e) => {
        e.preventDefault();
        setEvent(event);
        scrollRef.current?.scrollTo(0, 0);
      }}
    />
  );

  return (
    <div
      className="bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={() => setEvent(null)}
      ref={scrollRef}
      style={{
        position: "fixed",
        inset: "0 0",
        margin: "0 auto",
        overflow: "auto",
      }}
    >
      <div
        className="mx-auto my-16 bg-white rounded-xl overflow-hidden"
        style={{ width: "60rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <EventDetails event={event} EventTemlate={EventTemplate} />
      </div>
    </div>
  );
};

const EventPage = () => {
  const params = useParams();
  const event = getEventById(Number.parseInt(params.id));

  const [openEvent, setOpenEvent] = useState(null);

  const EventTemplate = ({ event }) => (
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
