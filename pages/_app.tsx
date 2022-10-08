import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import "../res/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen relative">
        <header className="bg-violet fixed flex justify-center top-0 w-full">
          <div
            className="flex h-12 items-stretch px-10 space-x-4 text-white"
            style={{ width: "72rem" }}
          >
            <Link href="/">
              <a className="align-center flex flex-grow items-center">
                <img
                  className="h-8 inline-block mr-2 w-8"
                  src="/logo.svg"
                  alt="Logo"
                />
                <div>Events</div>
              </a>
            </Link>
            {/* <input
            className="flex-grow flex-shrink hidden my-2 px-2 rounded-lg bg-white bg-opacity-70 sm:block"
            type="text"
            placeholder="Events durchsuchen..."
          /> */}
            {/* <div className="flex-grow sm:hidden" /> */}
            {/* <button>Anmelden</button> */}
          </div>
        </header>
        <main
          className="bg-white mt-12 pb-10 mx-auto overflow-x-clip"
          style={{
            maxWidth: "72rem",
          }}
        >
          <Component {...pageProps} />
        </main>
        <footer className="bg-violet flex justify-center w-full">
          <div
            className="flex h-36 items-center justify-between px-10 text-sm text-white"
            style={{ width: "72rem" }}
          >
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
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;