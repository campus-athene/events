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
import { useRouter } from "next/router";
import { Event, EventGroup } from "../../components";
import {
  event1,
  event2,
  event3,
  event4,
  getOrganiserById,
} from "../../dummyData";

const OrganiserPage = () => {
  const { query } = useRouter();

  const organiser =
    typeof query.id === "string"
      ? getOrganiserById(Number.parseInt(query.id))
      : null;

  if (!organiser) return null;

  return (
    <>
      <img
        alt=""
        className="max-h-96 object-cover w-full"
        src={organiser.headerImg}
      />
      <h1 className="font-medium m-10 mb-2 text-2xl">{organiser.name}</h1>
      <div className="flex px-10 gap-8">
        <div className="flex-grow">
          {organiser.desc
            .split("\n")
            .filter((d) => d)
            .map((d, i) => (
              <p className="mb-2" key={i}>
                {d}{" "}
              </p>
            ))}
        </div>
        <div className="flex flex-col flex-shrink-0">
          <img alt="" className="h-72 w-72" src={organiser.logo} />
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
      <EventGroup title="Workshops">
        <Event event={event3} />
        <Event event={event1} />
        <Event event={event4} />
      </EventGroup>
      <EventGroup title="Seminare">
        <Event event={event1} />
        <Event event={event2} />
      </EventGroup>
      <EventGroup title="Ähnliche Events von anderen Veranstaltern">
        <Event event={event2} />
        <Event event={event3} />
        <Event event={event1} />
        <Event event={event4} />
      </EventGroup>
    </>
  );
};

export default OrganiserPage;
