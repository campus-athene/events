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
      <header className="absolute inset-x-0 top-0 z-10 flex justify-center bg-violet lg:fixed">
        <div
          className="flex h-14 items-stretch space-x-4 px-4 text-white lg:px-10"
          style={{ width: "72rem" }}
        >
          <Link href="/">
            <a className="align-center flex flex-grow items-center">
              <img
                className="mr-4 inline-block h-10 w-10"
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
        className="fixed inset-0 z-20 hidden overflow-auto bg-black bg-opacity-50 backdrop-blur-sm lg:block"
        onClick={() => router.push("/")}
        style={{ display: "hideModal" in pageProps ? "none" : undefined }}
      />
      <main className="grid items-start">
        {/* Dialog */}
        <div
          className="z-30 col-start-1 row-start-1 mt-14 mb-36 overflow-hidden bg-white lg:mx-auto lg:w-[60rem] lg:rounded-xl"
          onClick={(e) => e.stopPropagation()}
          style={{ display: "hideModal" in pageProps ? "none" : undefined }}
        >
          <Component {...pageProps} />
        </div>
        {/* Home page */}
        {
          <div
            className="col-start-1 row-start-1 mx-auto mt-14 mb-36 hidden w-full overflow-y-auto overflow-x-hidden bg-white lg:block"
            style={{
              display: "hideModal" in pageProps ? "block" : undefined,
              minHeight: "calc(100vh - 12rem)",
              maxWidth: "72rem",
              overflowY: "hideModal" in pageProps ? undefined : "hidden",
            }}
          >
            <HomePage data={pageProps.homePageData} />
          </div>
        }
      </main>
      <footer className="absolute inset-x-0 bottom-0 flex justify-center bg-violet">
        <div
          className="flex h-36 flex-col items-center justify-center gap-4 px-10 text-center text-sm text-white lg:flex-row lg:justify-between"
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
