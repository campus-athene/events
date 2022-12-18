import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HomePage from "../components/HomePage";
import "../res/index.css";
import "../res/markdown.css";
import { HomePageData } from "./api/home";

export type AppPageProps = {
  hideModal?: true;
  homePageData?: HomePageData;
};

const App = ({ Component, pageProps }: AppProps<AppPageProps>) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="absolute lg:fixed bg-violet flex justify-center top-0 inset-x-0 z-10">
        <div
          className="flex h-14 items-stretch px-4 lg:px-10 space-x-4 text-white"
          style={{ width: "72rem" }}
        >
          <Link href="/">
            <a className="align-center flex flex-grow items-center">
              <img
                className="h-10 inline-block mr-4 w-10"
                src="/logo.svg"
                alt="Logo"
              />
              <div className="text-lg">
                <span className="opacity-70">Campus</span> <span>Events</span>
              </div>
            </a>
          </Link>
          {/* <input
            className="flex-grow flex-shrink hidden my-2 px-2 rounded-lg bg-white bg-opacity-70 lg:block"
            type="text"
            placeholder="Events durchsuchen..."
          /> */}
          {/* <div className="flex-grow lg:hidden" /> */}
          {/* <button>Anmelden</button> */}
        </div>
      </header>
      {/* Backdrop */}
      <div
        className="hidden lg:block bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 overflow-auto z-20"
        onClick={() => router.push("/")}
        style={{ display: "hideModal" in pageProps ? "none" : undefined }}
      ></div>
      <main className="grid items-start">
        {/* Dialog */}
        <div
          className="col-start-1 row-start-1 lg:mx-auto mt-14 mb-36 bg-white lg:rounded-xl overflow-hidden lg:w-[60rem] z-30"
          onClick={(e) => e.stopPropagation()}
          style={{ display: "hideModal" in pageProps ? "none" : undefined }}
        >
          <Component {...pageProps} />
        </div>
        {/* Home page */}
        {"hideModal" in pageProps && (
          <div
            className="hidden lg:block col-start-1 row-start-1 bg-white mx-auto mt-14 mb-36 overflow-x-clip overflow-y-auto"
            style={{
              display: "hideModal" in pageProps ? "block" : undefined,
              minHeight: "calc(100vh - 12rem)",
              maxWidth: "72rem",
              overflowY: "hideModal" in pageProps ? undefined : "hidden",
            }}
          >
            <HomePage data={pageProps.homePageData} />
          </div>
        )}
      </main>
      <footer className="absolute bg-violet bottom-0 flex justify-center inset-x-0">
        <div
          className="flex flex-col lg:flex-row gap-4 h-36 items-center justify-center lg:justify-between px-10 text-sm text-center text-white"
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
    </>
  );
};

export default App;
