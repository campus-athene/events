import { PrismaClient } from "@prisma/client";
import moment, { utc } from "moment";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import Image from "../components/Image";
import {
  getNoPastFilter,
  InterfaceEvent as EventType,
  mapPrismaEvent,
  prismaEventSelect,
  timezone,
} from "../utils";

type Data = {
  highlights: EventType[];
};

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const now = new Date();

  const select = prismaEventSelect;
  const noPastFilter = getNoPastFilter(now);

  return {
    props: {
      highlights: (
        await prisma.event.findMany({
          orderBy: { clicks: "desc" },
          select,
          take: 5,
          where: {
            AND: [
              noPastFilter,
              {
                date: {
                  lt: moment(now).add(10, "days").toDate(),
                },
              },
            ],
          },
        })
      ).map(mapPrismaEvent),
    },
  };
};

export const Event = (props: { event: EventType }) => {
  return (
    <div className="h-56 w-48 flex-shrink-0 rounded-xl bg-white text-sm">
      <Image
        className="mb-1 h-32 w-48 rounded-t-xl object-cover"
        src={props.event.image}
        width={48}
      />
      <div className="overflow-hidden text-ellipsis whitespace-nowrap px-3 pt-1 font-medium">
        {props.event.title}
      </div>
      <div className="block overflow-hidden text-ellipsis whitespace-nowrap px-3 pt-1 text-xs text-neutral-500">
        {props.event.organiser.name}
      </div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap px-3 pt-1 text-xs">
        {utc(props.event.date).tz(timezone).locale("de").format("llll")}
      </div>
      <div className="block overflow-hidden text-ellipsis whitespace-nowrap px-3 pt-1 text-xs">
        {props.event.venue}
      </div>
    </div>
  );
};

const Presentation: NextPage<Data> = (props) => {
  const { highlights } = props;

  const parent = useRef<HTMLDivElement>(null);
  const child = useRef<HTMLDivElement>(null);

  const setScale = () => {
    if (!child.current || !parent.current) return;
    const vScale = parent.current.offsetHeight / child.current.offsetHeight;
    const hScale = parent.current.offsetWidth / child.current.offsetWidth;
    child.current.style.transform = `scale(${Math.min(vScale, hScale)})`;
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => setScale());
    resizeObserver.observe(parent.current!);
    return () => resizeObserver.disconnect();
  }, [parent.current]);

  const openPresentationView = () => {
    const elem = parent.current;
    if (!elem) return;

    if (elem.requestFullscreen) elem.requestFullscreen();
    // @ts-ignore
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    // @ts-ignore
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  return (
    <>
      <Head>
        <title>Präsentations-Ansicht</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="m-16">
        <h1 className="mb-8 text-3xl font-medium">Präsentations-Ansicht</h1>
        <p>
          Die Präsentations-Ansicht ist gedacht für die Darstellung auf Beamern.
          Wenn die Ansicht geöffnet wird, wechselt der Web-Browser in den
          Vollbildmodus. Durch Klicken an beliebeiger Stelle kann sie wieder
          geschlossen werden.
        </p>
        <button
          className="mt-8 rounded-xl bg-violet px-8 py-2 text-white"
          onClick={() => openPresentationView()}
        >
          Präsentations-Ansicht aktivieren
        </button>

        {/* Hidden presentation view */}
        <div className="h-0 w-0 overflow-hidden">
          <div
            ref={parent}
            onClick={() => document.exitFullscreen()}
            className="bg-black text-center"
          >
            <div
              ref={child}
              className="inline-grid origin-top grid-cols-3 grid-rows-2 place-items-center gap-12 text-left"
            >
              {highlights.map((event) => (
                <Event key={event.id} event={event} />
              ))}
              <div className="col-start-2 row-start-2 text-center">
                <svg className="w-30" viewBox="0 0 29 29">
                  <path
                    fill="#fff"
                    d="M9,1v1H8V1V0h1h1v1H9z M15,0h-1h-1v1v1h1V1h1h1V0H15z M20,1h1V0h-1h-1h-1v1h1H20z M11,3h1V2V1h-1v1h-1H9v1h1H11z M17,2h1V1
                      h-1h-1v1v1h1V2z M19,3V2h-1v1H19z M8,3v1h1V3H8z M13,4V3h-1v1H13z M17,4h1V3h-1V4z M15,4h1V3h-1h-1v1v1h1V4z M16,5h-1v1h1v1h-1v1v1
                      h-1V8h-1v1v1v1h1v-1h1h1V9V8h1v1h1h1V8V7V6h1v1h1V6V5h-1V4h-1v1h-1v1v1h-1V6V5V4h-1V5z M14,5h-1v1h1V5z M11,6V5h1V4h-1h-1H9v1h1v1v1
                      h1V6z M14,6v1h1V6H14z M12,8h1V7V6h-1v1h-1v1H12z M4,9V8H3H2v1h1H4z M6,8H5v1h1h1h1V8H7H6z M10,8V7H9V6H8v1v1h1v1v1h1V9V8z M26,8h-1
                      v1h1V8z M28,8h-1v1h1v1h1V9V8H28z M12,9h-1v1h1V9z M20,10V9h-1v1H20z M6,10H5v1h1h1v-1H6z M11,10h-1v1v1h1v-1V10z M21,10v1h1v-1H21z
                      M25,10V9h-1h-1V8h-1v1v1h1v1h-1v1h1h1h1v-1V10z M26,10v1h1h1v-1h-1H26z M4,12H3v-1v-1H2H1V9V8H0v1v1v1h1v1v1H0v1h1v1h1v1v1h1v-1v-1
                      h1v-1H3H2v-1h1h1h1v-1v-1H4V12z M8,11H7v1h1h1v-1H8z M16,12h1v-1h1v-1h-1h-1v1V12z M29,12v-1h-1v1H29z M6,13h1v-1H6V13z M9,13h1v-1
                      H9V13z M15,12h-1v1v1h1v-1h1v-1H15z M28,13h1v1v1h-1v1v1v1h-1v1v1v1h1h1v1h-1v1h-1v-1h-1v1v1h-1v1h1v1h-1h-1v-1h-1h-1v1v1v1h1v1h-1
                      h-1h-1h-1h-1v-1v-1v-1h1v1h1h1v-1h-1v-1v-1v-1h-1h-1v-1h-1h-1v1v1h-1h-1h-1v-1h1v-1h1v-1h1v-1h1v-1h-1h-1v1v1h-1h-1v1h-1v-1v-1h1v-1
                      h-1h-1h-1v-1H9v1H8v-1H7v-1H6v-1h1v-1h1v1v1h1v-1v-1H8v-1h1h1v1h1v-1h1v-1h-1v-1h1v-1h1v1v1v1h1v1h-1h-1v1v1h1v1h1v-1v-1v-1h1v1h1
                      v-1h-1v-1h1v-1h1v-1h1v1h1v-1v-1h1v1h1v1h-1v1v1h-1h-1v-1h-1v1v1v1v1h1v-1v-1h1v1v1v1v1h-1v1h1v-1h1h1h1v-1v-1h1v1v1h1h1h1v-1v-1h-1
                      v-1h-1v1h-1v-1v-1h-1v-1v-1h-1v-1h1h1v1h1v1h1v1h1v1h1v-1v-1h-1v-1v-1h-1v-1h1h1v1H28z M16,18v-1h-1v1H16z M24,24v-1v-1v-1h-1h-1h-1
                      v1v1v1h1h1H24z M6,14v1h1v-1H6z M0,16v1h1v-1v-1H0V16z M5,16v-1H4v1H5z M20,17v1v1h1v-1v-1v-1v-1h-1v1V17z M1,18H0v1h1V18z M5,18v-1
                      H4v1H3v1h1h1V18z M6,18v1h1v-1H6z M7,20H6H5v1h1h1h1v1v1v1h1v-1h1v-1v-1v-1H9H8v-1H7V20z M1,21h1v-1H1V21z M3,21h1v-1H3V21z M22,23
                      h1v-1h-1V23z M11,24v1h1v-1v-1h-1h-1v1H11z M18,24h-1v1v1h1v-1V24z M27,25v-1h-1v1H27z M29,24h-1v1h1V24z M8,26v1h1v-1v-1H8V26z
                      M10,25v1h1v-1H10z M28,26v-1h-1v1H28z M11,26v1h-1v1h1v1h1v-1v-1h1v-1v-1h-1v1H11z M26,26v1h1v-1H26z M29,27v-1h-1v1H29z M14,28v1
                      h1v-1h1h1v-1h-1h-1v-1h-1v1h-1v1H14z M24,27v-1h-1v1v1h1h1h1v-1h-1H24z M27,28v1h1v-1v-1h-1V28z M8,29h1v-1H8V29z M1,0H0v1v4.9V7h1
                      h4.9H7V5.9V1V0H5.9H1z M5.9,5.9H1V1h4.9V5.9z M28,0H23h-1v1v4.9V7h1H28h1V5.9V1V0H28z M28,5.9H23V1H28V5.9z M1,22H0v1V28v1h1h4.9H7
                      v-1V23v-1H5.9H1z M5.9,28H1V23h4.9V28z M5,2H2v3h3V2z M27,2h-3v3h3V2z M5,24H2v3h3V24z"
                  />
                </svg>
                <p className="mt-6 text-sm text-white">
                  events.study-campus.de
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Presentation;
