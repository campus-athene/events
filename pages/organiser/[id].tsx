import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Organiser, PrismaClient } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Event, EventGroup } from "../../components";
import Image from "../../components/Image";
import {
  getNoPastFilter,
  InterfaceEvent,
  mapPrismaEvent,
  prismaEventSelect,
} from "../../utils";

const prisma = new PrismaClient();

const select = {
  id: true,
  name: true,
  description: true,
  logoImg: true,
  coverImg: true,
  eventLimit: true,
  group: true,
  socialWebsite: true,
  socialEmail: true,
  socialPhone: true,
  socialFacebook: true,
  socialInstagram: true,
  socialTwitter: true,
  socialLinkedin: true,
  socialTiktok: true,
  socialYoutube: true,
  socialTelegram: true,
};

type InterfaceOrganiser = Pick<Organiser, keyof typeof select>;

type Data = {
  organiser: InterfaceOrganiser;
  eventGroups: {
    name: string;
    events: InterfaceEvent[];
  }[];
};

export const getStaticProps: GetStaticProps<Data> = async (context) => {
  const noPastFilter = getNoPastFilter(new Date());

  if (typeof context.params?.id !== "string")
    return {
      notFound: true,
    };

  const resp = await prisma.organiser.findUnique({
    select: {
      ...select,
      events: { select: prismaEventSelect, where: noPastFilter },
    },
    where: { id: Number.parseInt(context.params.id) },
  });

  if (!resp)
    return {
      notFound: true,
    };

  const { events, ...organiser } = resp;

  const groups: { [name: string]: InterfaceEvent[] } = {};

  events.forEach((e) => {
    if (!(e.eventType in groups)) groups[e.eventType] = [];
    groups[e.eventType].push(mapPrismaEvent(e));
  });

  return {
    props: {
      organiser,
      eventGroups: Object.entries(groups).map(([name, events]) => ({
        name,
        events,
      })),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // paths: (await prisma.organiser.findMany({ select: { id: true } })).map(
    //   ({ id }) => ({ params: { id: id.toString() } })
    // ),
    paths: [], // Disable build time generation
    fallback: "blocking",
  };
};

const OrganiserPage = (props: Data) => {
  const organiser = props.organiser;

  return (
    <>
      <Head>
        <title>{props.organiser.name}</title>
        <meta
          name="description"
          content={props.organiser.description.substring(0, 400)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://events.study-campus.de/organiser/${props.organiser.id}`}
        />
        <meta
          property="og:image"
          content={`https://events.study-campus.de/api/image/72/${props.organiser.logoImg}`}
        />
      </Head>
      {organiser.coverImg && (
        <Image
          className="max-h-96 w-full object-cover"
          src={organiser.coverImg}
          width={228}
        />
      )}
      <h1 className="mx-4 my-10 mb-2 text-2xl font-medium sm:mx-10">
        {organiser.name}
      </h1>
      <div className="flex flex-col gap-8 px-4 sm:flex-row sm:px-10">
        <div className="markdown flex-grow">
          <ReactMarkdown>{organiser.description}</ReactMarkdown>
        </div>
        <div className="flex flex-shrink-0 flex-col">
          <Image
            className="hidden h-72 w-72 sm:block"
            src={organiser.logoImg}
            width={72}
          />
          <div className="mt-8 flex justify-center gap-2 text-2xl">
            {props.organiser.socialWebsite && (
              <a href={props.organiser.socialWebsite}>
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            )}
            {props.organiser.socialFacebook && (
              <a href={props.organiser.socialFacebook}>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            )}
            {props.organiser.socialInstagram && (
              <a href={props.organiser.socialInstagram}>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            )}
            {props.organiser.socialTwitter && (
              <a href={props.organiser.socialTwitter}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            )}
            {props.organiser.socialLinkedin && (
              <a href={props.organiser.socialLinkedin}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            )}
            {props.organiser.socialTiktok && (
              <a href={props.organiser.socialTiktok}>
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            )}
            {props.organiser.socialEmail && (
              <a href={`mailto:${props.organiser.socialEmail}`}>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            )}
            {props.organiser.socialPhone && (
              <a href={`tel:${props.organiser.socialPhone}`}>
                <FontAwesomeIcon icon={faPhone} />
              </a>
            )}
          </div>
        </div>
      </div>
      {props.eventGroups.map(({ name, events }) => (
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

export default OrganiserPage;
