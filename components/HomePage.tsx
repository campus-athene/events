import { useEffect, useState } from "react";
import { Event, EventGroup, Header, Highlight } from "../components";
import SubscribeNews from "../components/SubscribeNews";
import { HomePageData } from "../pages/api/home";

const HomePage = (props: { data?: HomePageData }) => {
  // Save initial data incase property is later set to null.
  const [data, setData] = useState<HomePageData | null>(props.data || null);
  const [loadStarted, setLoadStarted] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    // Do not run effect if we already have data
    if (data) return;

    // Run effect only once
    if (loadStarted) return;
    setLoadStarted(true);

    console.log("Loading home data");
    fetch("/api/home")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setOffline(true));
  }, [data, loadStarted]);

  const [getDateRange, setDateRange] = useState<string | null>(null);

  // To Do: Return offline warning if necessary
  if (!data) return null; // To do: Return skeleton

  const dateRange =
    getDateRange || (data.dateRanges[0] ? data.dateRanges[0].name : "");

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

  return (
    <>
      <Header className="px-4 sm:px-10">Highlights</Header>
      <div className="grid grid-cols-2 gap-4 px-4 pt-2 sm:grid-cols-3 sm:px-10 lg:grid-cols-2">
        {data.highlights.map((e, i) => (
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
      {data.dateRanges[0] && (
        <>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap px-4 sm:px-10">
            {data.dateRanges.map(({ name }) => (
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
            {data.dateRanges
              .find((r) => r.name === dateRange)
              ?.events.map((e) => (
                <Event key={e.id} event={e} />
              ))}
          </EventGroup>
        </>
      )}
      <SubscribeNews />
      {data.categories.map(({ name, events }) => (
        <EventGroup key={name} title={name}>
          {events.map((e) => (
            <Event key={e.id} event={e} />
          ))}
        </EventGroup>
      ))}
      <div className="h-10" />
    </>
  );
};

export default HomePage;
