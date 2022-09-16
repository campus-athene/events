import { DummyEvent, EventGroup, Header, HeaderGroup } from "./Event";

const Home = () => {
  const Interest = ({ children, selected }) =>
    selected ? (
      <button className="bg-slate-400 px-3 py-0.5 rounded-full" type="checkbox">
        {children}
      </button>
    ) : (
      <button className="bg-slate-300 px-3 py-0.5 rounded-full" type="checkbox">
        {children}
      </button>
    );

  return (
    <>
      <img
        alt="Start-up &amp; Innovation Day 2022"
        src="https://www.tu-darmstadt.de/media/daa_responsives_design/04_wissenstransfer_medien/highest/veranstaltungen_8/startup___innovation_da/bilder_26/Header-Innoday_0x570.jpg"
      />
      <EventGroup title="Highlights">
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <Header>Empfehlungen für Dich</Header>
      <div className="text-sm">Was interessiert Dich?</div>
      <div className="flex gap-2">
        <Interest selected>Workshop</Interest>
        <Interest>Technik</Interest>
        <Interest>Maschinenbau</Interest>
        <Interest selected>Agil</Interest>
        <Interest>Gastvortrag</Interest>
        <Interest>Logistik</Interest>
      </div>
      <EventGroup>
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <HeaderGroup>
        <Header default value="today">
          Heute
        </Header>
        <Header value="tomorow">Morgen</Header>
        <Header value="thisweek">Diese Woche</Header>
        <Header value="nextweek">Nächste Woche</Header>
      </HeaderGroup>
      <EventGroup>
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <div className="bg-violet mt-8 p-8 rounded-3xl text-white">
        <div className="mb-2 text-lg">Verpasse keine weiteren Events mehr!</div>
        <div className="mb-4">
          Erhalte einmal pro Woche einen auf Dich persönlich zugeschnittenen
          Newsletter.
        </div>
        <input
          className="bg-slate-600 rounded-l-full pl-3 pr-2"
          placeholder="E-Mail-Adresse"
          type="text"
        />
        <button className="bg-amber-500 pl-4 pr-5 rounded-r-full">
          Abbonieren
        </button>
      </div>
      <EventGroup title="Workshops">
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <EventGroup title="Sport">
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <EventGroup title="Hochschulgruppen">
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <EventGroup title="Gastvorträge">
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
    </>
  );
};

export default Home;
