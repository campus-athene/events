import { GetStaticProps } from "next";
import Head from "next/head";
import { getHomeData } from "./api/home";
import { AppPageProps } from "./_app";

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
  const homePageData = await getHomeData();

  if (homePageData.highlights.length < 4)
    return {
      redirect: {
        destination: "https://www.study-campus.de/",
        basePath: false,
        permanent: false,
      },
    };

  return {
    props: {
      hideModal: true,
      homePageData: await getHomeData(),
    },
    revalidate: 60,
  };
};

const Home = () => {
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
    </>
  );
};

export default Home;
