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
            className="text-center"
          >
            <div
              ref={child}
              className="inline-grid origin-top grid-cols-3 grid-rows-2 place-items-center gap-12 bg-black text-left"
            >
              {highlights.map((event) => (
                <Event key={event.id} event={event} />
              ))}
              <div className="col-start-2 row-start-2 text-center">
                <svg className="w-30" viewBox="0 0 200 200">
                  <path
                    fill="#fff"
                    d="M16,56h8h8h8h8h8v-8v-8v-8v-8v-8V8V0h-8h-8h-8h-8h-8H8H0v8v8v8v8v8v8v8h8H16z M8,40v-8v-8v-8V8h8h8h8h8h8v8v8v8v8v8h-8h-8
                    h-8h-8H8V40z M16,64v8H8H0v-8h8H16z M16,80v8H8v-8H16z M8,104H0v-8h8h8v8H8z M24,80h-8v-8h8V80z M24,96h-8v-8h8V96z M24,40h-8v-8v-8
                    v-8h8h8h8v8v8v8h-8H24z M32,160h8v8v8v8h-8h-8h-8v-8v-8v-8h8H32z M32,72h-8v-8h8h8v8v8v8v8h-8v-8h-8v-8h8V72z M48,104v8h-8h-8v8h-8
                    v8v8h-8H8v-8v-8h8v-8h8v-8h8h8H48z M48,120v8h-8v-8H48z M40,144h-8h-8h-8H8H0v8v8v8v8v8v8v8h8h8h8h8h8h8h8v-8v-8v-8v-8v-8v-8v-8h-8
                    H40z M48,160v8v8v8v8h-8h-8h-8h-8H8v-8v-8v-8v-8v-8h8h8h8h8h8V160z M56,64v8h-8v-8H56z M48,80h8v8h-8V80z M56,104h-8v-8h8V104z
                    M56,120h-8v-8h8V120z M56,80v-8h8v8H56z M56,112v-8h8h8v-8v-8h8v-8h8h8v8v8h8v8h-8v8h-8v-8v-8h-8v8v8v8h-8h-8v-8H56z M72,0v8h-8V0
                    H72z M72,56v8h-8v-8v-8h8V56z M72,136v8h-8v-8h-8h-8v-8h8v-8h8v8h8V136z M72,184h8v8h-8v8h-8v-8v-8H72z M80,8h8v8v8h-8v-8h-8V8H80z
                    M80,32v8h-8v-8H80z M80,72v8h-8v-8v-8h8v-8v-8v-8h8v8v8h8v8h8v8v8h-8v-8h-8H80z M96,40h-8v-8h8V40z M88,192h8v8h-8V192z M104,0v8
                    h-8h-8V0h8H104z M104,56h-8v-8v-8h8h8v8h-8V56z M96,192v-8h8v8H96z M104,32h-8v-8v-8h8V8h8v8h8h8V8V0h8v8v8v8h-8v8h-8v-8h-8v8H104z
                    M112,64h-8v-8h8V64z M112,128v8h-8h-8h-8h-8v-8v-8h8v8h8h8H112z M120,8h-8V0h8V8z M120,40h-8v-8h8V40z M112,56v-8h8v8H112z M128,40
                    v-8h8v8v8v8v8v8h-8v8h8v8h-8h-8v8h-8v-8v-8v-8v-8h8h8v-8v-8V40z M128,200v-8h8h8v8h-8H128z M136,80v-8h8v8H136z M136,176h8v8h-8V176
                    z M152,72h-8v-8h8V72z M144,96h8v8h-8V96z M144,144h8v8h-8V144z M160,120h-8v8h-8v-8h8v-8h-8v-8h-8h-8v-8h-8v8h-8v8h-8h-8v8h8h8h8h8
                    h8v8h-8h-8v8h-8v8h-8h-8h-8h-8h-8v8v8h-8v8v8h8h8v8h8h8v-8h8v-8v-8h-8v-8h8v8h8v8h8v8v8h-8v8h8h8v-8v-8v-8h8h8v8h8v-8h8h8v-8v-8v-8
                    v-8v-8h-8V120z M88,160h-8v-8h8V160z M128,144v8h-8v-8H128z M160,144v8v8h-8h-8h-8v-8v-8v-8h8h8h8V144z M176,16h8v8v8v8h-8h-8h-8v-8
                    v-8v-8h8H176z M168,192h8v8h-8V192z M184,72h8v8h-8h-8v8h8h8v-8h8v8v8v8h-8v-8h-8h-8h-8v-8v-8h-8v8v8h-8v-8h-8v-8h8v-8h8h8h8H184z
                    M184,104h8v8h8v8v8h-8v-8h-8v8h8v8v8h-8h-8v-8v-8h-8v-8h-8v-8v-8h8v8h8h8V104z M184,152h8v8h-8V152z M192,168h8v8v8v8v8h-8v-8h-8
                    h-8v-8h-8v8h-8h-8v-8h8v-8h8h8h8v-8H192z M192,0h-8h-8h-8h-8h-8h-8v8v8v8v8v8v8v8h8h8h8h8h8h8h8v-8v-8v-8v-8v-8V8V0H192z M192,16v8
                    v8v8v8h-8h-8h-8h-8h-8v-8v-8v-8v-8V8h8h8h8h8h8V16z M192,64h8v8h-8V64z M192,152v-8h8v8H192z"
                  />
                </svg>
                <p className="mt-6 text-sm text-white">www.study-campus.de</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Presentation;
