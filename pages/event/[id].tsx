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
import { PrismaClient } from "@prisma/client";
import { utc } from "moment";
import "moment-timezone";
import "moment/locale/de";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Event as EventTemplate, EventGroup } from "../../components";
import Image from "../../components/Image";
import {
  InterfaceEvent as Event,
  InterfaceEvent,
  mapPrismaEvent,
  prismaEventSelect,
  timezone,
} from "../../utils";
import { ResponseBody } from "../api/eventRec/[id]";

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
  const [canShare, setCanShare] = useState(true);

  // Wrap as memo so that it can be used as effect dependency. If it was not a memo,
  // the effect would be recalled on every render.
  const shareData = useMemo(
    () => ({
      title: props.event.title,
      text: props.event.description.substring(0, 400),
      url: `https://events.study-campus.de/event/${props.event.id}`,
    }),
    [props.event]
  );

  const getFavEvents = (): string[] => {
    const favEvents =
      typeof window === "object" ? localStorage.getItem("favEvents") : null;
    if (!favEvents) return [];
    return favEvents.split("|");
  };
  const [fav, setFavState] = useState(false);
  useEffect(
    () => setFavState(getFavEvents().includes(props.event.id.toString())),
    [props.event.id]
  );

  // Wrap as callback so that it can be used as effect dependency. If it was not a
  // callback, the effect would be recalled on every render.
  const setFav = useCallback(
    (fav: boolean) => {
      setFavState(fav);
      localStorage.setItem(
        "favEvents",
        (fav
          ? [...getFavEvents(), props.event.id]
          : getFavEvents().filter((e) => e !== props.event.id.toString())
        ).join("|")
      );
    },
    [props.event.id]
  );

  useEffect(() => {
    // Will only execute in browser environment.
    // canShare and fav cannot be set while prerendering serverside.
    // navigator.canShare is undefined when not serving via https.
    navigator.canShare && setCanShare(navigator.canShare(shareData));
    setFav(getFavEvents().includes(props.event.id.toString()));
  }, [setFav, props.event.id, shareData]);

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
      <div className="grid items-stretch justify-items-stretch sm:grid-cols-5">
        <Image
          className="object-cover sm:col-span-2"
          src={event.image}
          width={115.2}
        />
        <div className="bg-neutral-200 p-4 sm:col-span-3 sm:p-10 sm:text-right">
          <div className="text-2xl font-medium">{event.title}</div>
          <Link href={`/organiser/${event.organiser.id}`}>
            <a className="mb-4 block text-neutral-500 hover:underline">
              {event.organiser.name}
            </a>
          </Link>
          <div className="">{event.venue}</div>
          <div>{utc(event.date).tz(timezone).locale("de").format("llll")}</div>
          <div className="flex-grow" />
          <div className="mt-6 flex flex-row-reverse justify-end gap-8 sm:flex-row sm:gap-10">
            <button
              className={fav ? "text-red-700" : "text-neutral-600"}
              onClick={() => setFav(!fav)}
            >
              <FontAwesomeIcon
                className="h-6"
                icon={fav ? faSolidHeart : faRegularHeart}
              />
            </button>
            {canShare && (
              <button
                className="text-neutral-600"
                onClick={() => navigator.share(shareData)}
              >
                <FontAwesomeIcon className="h-6" icon={faShareFromSquare} />
              </button>
            )}
            {event.registrationLink && (
              <a
                className="rounded-xl bg-violet p-2 px-8 text-white"
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
      <div className="grid items-stretch justify-items-stretch gap-4 px-4 py-10 pb-0 sm:grid-cols-4 sm:gap-10 sm:px-10 md:grid-cols-5">
        <div className="markdown sm:col-span-2 sm:row-span-2 md:col-span-3">
          <ReactMarkdown>{event.description}</ReactMarkdown>
        </div>
        <div
          className="grid gap-2 self-start rounded-xl bg-neutral-200 p-4 sm:col-span-2 sm:col-start-3 md:col-start-4"
          style={{ gridTemplateColumns: "max-content 1fr" }}
        >
          <Information icon={faTicket}>
            {!event.registrationLink ? (
              "Keine Anmeldung erforderlich"
            ) : (
              <a className="hover:underline" href={event.registrationLink}>
                {event.registrationDeadline
                  ? `Anmeldung bis ${utc(event.registrationDeadline)
                      .tz(timezone)
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
        {process.env.NEXT_PUBLIC_GCP_API_KEY && event.venuePlaceId && (
          <iframe
            className="h-64 min-w-0 rounded-xl object-cover sm:col-span-2"
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
              <EventTemplate key={e.id} event={e} />
            ))}
          </EventGroup>
        )}
        {similar && !!similar.length && (
          <EventGroup title="Ähnliche Events, die Dich interessieren könnten">
            {similar.map((e) => (
              <EventTemplate key={e.id} event={e} />
            ))}
          </EventGroup>
        )}
      </div>
    </>
  );
};

export default EventPage;
