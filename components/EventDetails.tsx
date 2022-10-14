import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faHeart as faRegularHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEuroSign,
  faHeart as faSolidHeart,
  faMapLocationDot,
  faShareFromSquare,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { utc } from "moment";
import "moment/locale/de";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Event as DefaultEventTemplate, EventGroup } from ".";
import { ResponseBody } from "../pages/api/eventRec/[id]";
import { InterfaceEvent as Event } from "../utils";
import Image from "./Image";

const EventDetails = (props: {
  event: Event;
  EventTemlate: ({ event }: { event: Event }) => JSX.Element;
}) => {
  const Event = props.EventTemlate || DefaultEventTemplate;

  const getFavEvents = (): string[] => {
    const favEvents = localStorage.getItem("favEvents");
    if (!favEvents) return [];
    return favEvents.split("|");
  };
  const [fav, setFavState] = useState(
    getFavEvents().includes(props.event.id.toString())
  );
  const setFav = (fav: boolean) => {
    setFavState(fav);
    localStorage.setItem(
      "favEvents",
      (fav
        ? [...getFavEvents(), props.event.id]
        : getFavEvents().filter((e) => e !== props.event.id.toString())
      ).join("|")
    );
  };

  const [{ event: serverEvent, sameOrg, similar }, setServerData] = useState<{
    event: Event | null;
    sameOrg: Event[] | null;
    similar: Event[] | null;
  }>({ event: null, sameOrg: null, similar: null });

  useEffect(() => {
    fetch(`/api/eventRec/${props.event.id}`)
      .then((res) => res.json())
      .then((data) => setServerData(data as ResponseBody));
  }, [props.event.id]);

  const event = serverEvent || props.event;

  const shareData = {
    title: props.event.title,
    text: props.event.desc.substring(0, 400),
    url: `https://events.study-campus.de/event/${props.event.id}`,
  };

  const Information = (props: {
    children: ReactNode;
    href?: string;
    icon: IconProp;
  }) => (
    <>
      <div className="justify-self-center text-neutral-600">
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <div>
        {props.href === undefined ? (
          props.children
        ) : (
          <a className="hover:underline" href={props.href}>
            {props.children}
          </a>
        )}
      </div>
    </>
  );

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
          <div>{utc(event.date).local().locale("de").format("llll")}</div>
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
            {navigator.canShare(shareData) && (
              <button
                className="text-neutral-600"
                onClick={() => navigator.share(shareData)}
              >
                <FontAwesomeIcon className="h-6" icon={faShareFromSquare} />
              </button>
            )}
            {event.registrationLink && (
              <a
                className="bg-violet p-2 px-8 rounded-xl text-white"
                href={event.registrationLink}
              >
                Anmelden
              </a>
            )}
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
        style={{ gridTemplateRows: "max-content 20.5rem" }}
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
        <div
          className="bg-neutral-200 col-start-4 col-span-2 gap-2 grid p-4 rounded-xl self-start"
          style={{ gridTemplateColumns: "max-content 1fr" }}
        >
          <Information icon={faTicket}>
            {!event.registrationLink ? (
              "Keine Anmeldung erforderlich"
            ) : (
              <a className="hover:underline" href={event.registrationLink}>
                {event.registrationDeadline
                  ? `Anmeldung bis ${utc(event.registrationDeadline)
                      .local()
                      .locale("de")
                      .format("llll")}`
                  : "Anmeldung erforderlich"}
              </a>
            )}
          </Information>
          <Information icon={faEuroSign}>
            {event.price || "Kostenlos"}
          </Information>
          <Information icon={faMapLocationDot}>
            {event.online ? (
              "Online"
            ) : (
              <>
                {event.venue}
                {event.venueAddress ? (
                  <>
                    <br />
                    {event.venueAddress}
                  </>
                ) : null}
              </>
            )}
          </Information>
          {event.organiser.socialEmail && (
            <Information
              href={`mailto:${event.organiser.socialEmail}`}
              icon={faEnvelope}
            >
              {event.organiser.socialEmail}
            </Information>
          )}
        </div>
        {event.venuePlaceId && (
          <iframe
            className="col-span-2 object-cover rounded-xl"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
              process.env.NEXT_PUBLIC_GCP_API_KEY || ""
            )}&q=place_id:${encodeURIComponent(event.venuePlaceId)}`}
          ></iframe>
        )}
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
