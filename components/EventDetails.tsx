import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Event as DefaultEventTemplate, EventGroup } from ".";
import { InterfaceEvent as Event } from "../utils";
import Image from "./Image";

const EventDetails = (props: {
  event: Event;
  EventTemlate: ({ event }: { event: Event }) => JSX.Element;
}) => {
  const Event = props.EventTemlate || DefaultEventTemplate;
  const [fav, setFav] = useState(false);

  const [{ event: serverEvent, sameOrg, similar }, setServerData] = useState<{
    event: Event | null;
    sameOrg: Event[] | null;
    similar: Event[] | null;
  }>({ event: null, sameOrg: null, similar: null });

  useEffect(() => {
    fetch(`/api/eventRec/${props.event.id}`)
      .then((res) => res.json())
      .then((data) => setServerData(data));
  }, [props.event.id]);

  const event = serverEvent || props.event;

  return (
    <>
      <div
        className="grid grid-cols-5 items-stretch justify-items-stretch"
        style={{ gridTemplateRows: "16rem max-content" }}
      >
        <Image
          className="col-span-2 object-cover"
          src={event.image}
          width={115.2}
        />
        <div className="bg-neutral-200 col-span-3 p-10 text-right">
          <div className="font-medium text-2xl">{event.title}</div>
          <Link href={`/organiser/${event.organiser.id}`}>
            <a className="block hover:underline mb-4 text-neutral-500">
              {event.organiser.name}
            </a>
          </Link>
          <div className="">{event.venue}</div>
          <div>{event.date.toLocaleString()}</div>
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
            {event.desc
              .split("\n")
              .filter((d) => d)
              .map((d, i) => (
                <p className="mb-2" key={i}>
                  {d}{" "}
                </p>
              ))}
          </p>
        </div>
        {event.venuePlaceId && (
          <iframe
            className="col-span-2 object-cover"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
              process.env.NEXT_PUBLIC_GCP_API_KEY || ""
            )}&q=place_id:${encodeURIComponent(event.venuePlaceId)}`}
          ></iframe>
        )}
        <div
          className="bg-neutral-200 col-start-4 col-span-2 gap-2 grid p-4 rounded-xl self-start"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div className="text-neutral-600">Adresse:</div>
          <div>{event.venue}</div>
          <div className="text-neutral-600">Preis:</div>
          <div>{event.price}</div>
        </div>
      </div>
      <div className="pb-10">
        {sameOrg && !!sameOrg.length && (
          <EventGroup title="Weitere Events von diesem Veranstalter">
            {sameOrg.map((e) => (
              <Event key={e.id} event={e} />
            ))}
          </EventGroup>
        )}
        {similar && !!similar.length && (
          <EventGroup title="Ähnliche Events, die Dich interessieren könnten">
            {similar.map((e) => (
              <Event key={e.id} event={e} />
            ))}
          </EventGroup>
        )}
      </div>
    </>
  );
};

export default EventDetails;
