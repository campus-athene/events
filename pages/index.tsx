import { Prisma, PrismaClient } from "@prisma/client";
import moment from "moment";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import {
  Event as EventTemplate,
  EventGroup,
  Header,
  Highlight as HighlightTemplate,
} from "../components";
import EventModal from "../components/EventModal";
import SubscribeNews from "../components/SubscribeNews";
import {
  InterfaceEvent as Event,
  mapPrismaEvent,
  noPastFilter,
  prismaEventSelect,
  takeEventsPerRow,
} from "../utils";

type Data = {
  highlights: Event[];
  dateRanges: {
    name: string;
    events: Event[];
  }[];
  categories: { name: string; events: Event[] }[];
};

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const now = moment();

  const select = prismaEventSelect;
  const take = takeEventsPerRow;

  /**
   * Helper function to filter for values not null or undefined. null and undefined are excluded from type of returned elements.
   * @param value
   * @returns
   */
  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  async function awaitAll<TResult>(
    promises: Promise<TResult>[]
  ): Promise<TResult[]> {
    return (await Promise.allSettled(promises))
      .map((r) => {
        if (r.status === "fulfilled") return r.value;
        console.warn(r.reason);
        return null;
      })
      .filter(notEmpty);
  }

  return {
    props: {
      highlights: (
        await prisma.event.findMany({
          orderBy: { clicks: "desc" },
          select,
          take: 6,
          where: noPastFilter,
        })
      ).map(mapPrismaEvent),
      dateRanges: (
        await awaitAll(
          [
            {
              name: "Heute",
              from: now.clone(),
              to: now.clone().endOf("day"),
            },
            {
              name: "Morgen",
              from: now.clone().add(1, "day").startOf("day"),
              to: now.clone().add(1, "day").endOf("day"),
            },
            ...(now.isoWeekday() <= 5
              ? [
                  {
                    name: "Diese Woche",
                    from: now.clone().startOf("week"),
                    to: now.clone().endOf("week"),
                  },
                ]
              : []),
            {
              name: "Nächste Woche",
              from: now.clone().add(1, "week").startOf("week"),
              to: now.clone().add(1, "week").endOf("week"),
            },
          ].map(async ({ name, from, to }) => ({
            name,
            events: (
              await prisma.event.findMany({
                orderBy: { clicks: "desc" },
                select,
                take,
                where: { date: { gte: from.toDate(), lt: to.toDate() } },
              })
            ).map(mapPrismaEvent),
          }))
        )
      ).filter((r) => r.events.length),
      categories: (
        await awaitAll(
          (
            [
              {
                name: "Workshops",
                where: { eventType: "Workshop" },
              },
              {
                name: "Präsenz",
                where: {
                  online: true,
                },
              },
              {
                name: "Hochschulgruppen",
                where: {
                  organiser: { group: "Hochschulgruppe" },
                },
              },
              {
                name: "Fachschaften",
                where: {
                  organiser: { group: "Fachschaft" },
                },
              },
              {
                name: "Exkursionen",
                where: { eventType: "Exkursion" },
              },
              {
                name: "Online",
                where: { online: true },
              },
              ...(
                await prisma.organiser.findMany({
                  orderBy: { events: { _count: "desc" } },
                  select: { id: true, name: true },
                  where: {
                    events: {
                      some: noPastFilter,
                    },
                  },
                })
              ).map((o) => ({ name: o.name, where: { organiserId: o.id } })),
            ] as { name: string; where: Prisma.EventWhereInput }[]
          ).map(async ({ name, where }) => ({
            name,
            events: (
              await prisma.event.findMany({
                orderBy: { clicks: "desc" },
                select,
                take,
                where: {
                  ...noPastFilter,
                  ...where,
                },
              })
            ).map(mapPrismaEvent),
          }))
        )
      ).filter((e) => e.events.length >= 2),
    },
    // revalidate: 60, // Only use in getStaticProps
  };
};

const Home = (props: Data) => {
  console.log(props.dateRanges);
  const [dateRange, setDateRange] = useState(
    props.dateRanges[0] ? props.dateRanges[0].name : ""
  );
  const [openEvent, setOpenEvent] = useState<Event | null>(null);

  // const Interest = (props: { children?: ReactNode; selected?: boolean }) => {
  //   const [s, setS] = useState(props.selected);
  //   return (
  //     <button
  //       className={
  //         "px-3 py-0.5 rounded-full transition-colors " +
  //         (s ? "bg-amber-400" : "bg-slate-200")
  //       }
  //       type="button"
  //       onClick={() => setS(!s)}
  //     >
  //       {props.children}
  //     </button>
  //   );
  // };

  const Event = (props: { event: Event }) => (
    <EventTemplate
      event={props.event}
      onClick={(e) => {
        if (window.innerWidth < 640) return;
        e.preventDefault();
        setOpenEvent(props.event);
      }}
    />
  );
  const Highlight = (props: { className?: string; event: Event }) => (
    <HighlightTemplate
      event={props.event}
      className={props.className}
      onClick={(e) => {
        if (window.innerWidth < 640) return;
        e.preventDefault();
        setOpenEvent(props.event);
      }}
    />
  );

  return (
    <>
      <Head>
        <title>Campus Events</title>
        <meta
          name="description"
          content="Du willst wissen, was auf dem Campus los ist? Hier findest Du von Parties über Exkursionen bis Workshops alles, was Dich interessiert."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://events.study-campus.de/`} />
        <meta
          property="og:image"
          content={`https://events.study-campus.de/ogimage.png`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="999" />
        <meta property="og:image:height" content="666" />
      </Head>
      <Header className="px-4 sm:px-10">Highlights</Header>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 px-4 sm:px-10 pt-2">
        {props.highlights.map((e, i) => (
          <Highlight
            className={i >= 4 ? "hidden sm:flex" : ""}
            event={e}
            key={e.id}
          />
        ))}
      </div>
      {/* <Header className="mx-10">Empfehlungen für Dich</Header>
      <div className="mx-10 text-sm">Was interessiert Dich?</div>
      <div className="flex gap-2 mx-10">
        <Interest selected>Workshop</Interest>
        <Interest>Technik</Interest>
        <Interest>Maschinenbau</Interest>
        <Interest selected>Agil</Interest>
        <Interest>Gastvortrag</Interest>
        <Interest>Logistik</Interest>
      </div>
      <EventGroup>
        <Event event={event4} />
        <Event event={event2} />
        <Event event={event5} />
      </EventGroup> */}
      {props.dateRanges[0] && (
        <>
          <div className="flex gap-2 overflow-x-auto px-4 sm:px-10 whitespace-nowrap">
            {props.dateRanges.map(({ name }) => (
              <Header
                key={name}
                onClick={() => setDateRange(name)}
                selected={dateRange === name}
              >
                {name}
              </Header>
            ))}
          </div>
          <EventGroup>
            {props.dateRanges
              .find((r) => r.name === dateRange)
              ?.events.map((e) => (
                <Event key={e.id} event={e} />
              ))}
          </EventGroup>
        </>
      )}
      <SubscribeNews />
      {props.categories.map(({ name, events }) => (
        <EventGroup key={name} title={name}>
          {events.map((e) => (
            <Event key={e.id} event={e} />
          ))}
        </EventGroup>
      ))}
      <div className="h-10" />
      <EventModal event={openEvent} setEvent={setOpenEvent} />
    </>
  );
};

export default Home;