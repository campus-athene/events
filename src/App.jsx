import { Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import Router from "./Router";

function App() {
  return (
    <div className="bg-slate-200 min-h-screen relative">
      <header className="bg-violet fixed flex h-12 items-stretch px-4 space-x-4 text-white w-full">
        <Link className="align-center flex items-center" to="/">
          <img className="h-8 inline-block mr-2 w-8" src={logo} alt="Logo" />
          <div>Events</div>
        </Link>
        <input
          className="flex-grow flex-shrink hidden my-2 px-2 rounded-lg bg-white bg-opacity-70 sm:block"
          type="text"
          placeholder="Events durchsuchen..."
        />
        <div className="flex-grow sm:hidden" />
        <button>Anmelden</button>
      </header>
      <div className="bg-white max-w-4xl pt-12 pb-48 mx-auto px-10">
        <Router />
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
