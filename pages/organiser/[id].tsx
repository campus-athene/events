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
import { Event, EventGroup } from "../../components";
import Image from "../../components/Image";
import { InterfaceEvent, mapPrismaEvent, prismaEventSelect } from "../../utils";

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
  if (typeof context.params?.id !== "string")
    return {
      notFound: true,
    };

  const resp = await prisma.organiser.findUnique({
    select: { ...select, events: { select: prismaEventSelect } },
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
    paths: (await prisma.organiser.findMany({ select: { id: true } })).map(
      ({ id }) => ({ params: { id: id.toString() } })
    ),
    fallback: "blocking",
  };
};

const OrganiserPage = (props: Data) => {
  const organiser = props.organiser;

  return (
    <>
      <Image
        className="max-h-96 object-cover w-full"
        src={organiser.coverImg}
        width={228}
      />
      <h1 className="font-medium m-10 mb-2 text-2xl">{organiser.name}</h1>
      <div className="flex px-10 gap-8">
        <div className="flex-grow">
          {organiser.description
            .split("\n")
            .filter((d) => d)
            .map((d, i) => (
              <p className="mb-2" key={i}>
                {d}{" "}
              </p>
            ))}
        </div>
        <div className="flex flex-col flex-shrink-0">
          <Image className="h-72 w-72" src={organiser.logoImg} width={72} />
          <div className="flex gap-2 justify-center mt-8 text-2xl">
            <FontAwesomeIcon icon={faGlobe} />
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faLinkedinIn} />
            <FontAwesomeIcon icon={faTiktok} />
            <FontAwesomeIcon icon={faEnvelope} />
            <FontAwesomeIcon icon={faPhone} />
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
    </>
  );
};

export default OrganiserPage;
