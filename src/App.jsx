import { createContext, useContext } from "react";
import "./App.css";
import { DummyEvent } from "./Event";
import logo from "./logo.svg";

function App() {
  const HeaderGroupContext = createContext(null);
  const HeaderGroup = ({ children, defaultValue }) => {
    return (
      <HeaderGroupContext.Provider value={defaultValue || ""}>
        <div className="flex gap-2">{children}</div>
      </HeaderGroupContext.Provider>
    );
  };
  const Header = ({ children, value, ...props }) => {
    const context = useContext(HeaderGroupContext);

    if (context === null) return <h2 className="pt-8 text-lg">{children}</h2>;

    return context === value || (context === "" && props.default) ? (
      <button className="pt-8 text-lg">{children}</button>
    ) : (
      <button className="pt-8 text-slate-400 text-lg">{children}</button>
    );
  };
  const EventGroup = ({ children, title }) => (
    <>
      {title && <Header>{title}</Header>}
      <div className="flex flex-wrap gap-4 pt-2">{children}</div>
    </>
  );
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
    <div className="bg-slate-200 min-h-screen relative">
      <header className="bg-violet fixed flex h-12 items-stretch px-4 space-x-4 text-white w-full">
        <div className="align-center flex items-center">
          <img className="h-8 inline-block mr-2 w-8" src={logo} alt="Logo" />
          <div>Events</div>
        </div>
        <input
          className="flex-grow flex-shrink hidden my-2 px-2 rounded-lg bg-white bg-opacity-70 sm:block"
          type="text"
          placeholder="Events durchsuchen..."
        />
        <div className="flex-grow sm:hidden" />
        <button>Anmelden</button>
      </header>
      <div className="bg-white max-w-4xl pt-12 pb-48 mx-auto px-10">
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
          <div className="mb-2 text-lg">
            Verpasse keine weiteren Events mehr!
          </div>
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
      </div>
      <footer className="absolute bottom-0 bg-violet flex h-36 items-center justify-between px-4 text-sm text-white w-full">
        <div>
          Campus Events ist ein Angebot der Campus Plattform.{" "}
          <a className="underline" href="https://www.study-campus.de">
            Erfahre mehr.
          </a>
        </div>
        <div>
          <a className="underline" href="https://www.study-campus.de/legal">
            Impressum
          </a>{" "}
          |{" "}
          <a className="underline" href="https://www.study-campus.de/legal">
            Datenschutz
          </a>{" "}
          |{" "}
          <a className="underline" href="https://www.study-campus.de/legal">
            Kontakt
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
