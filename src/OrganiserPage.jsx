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
import { useParams } from "react-router-dom";
import { Event, EventGroup } from "./Components";
import { event1, event2, event3, event4, getOrganiserById } from "./dummyData";

const OrganiserPage = () => {
  const params = useParams();

  const organiser = getOrganiserById(Number.parseInt(params.id));

  return (
    <>
      <img alt="" src={organiser.headerImg} />
      <div className="flex px-10">
        <div className="flex-grow mr-4 mt-10">
          <h1 className="mb-2 font-medium text-2xl">{organiser.name}</h1>
          <p>{organiser.desc}</p>
        </div>
        <div className="flex flex-col flex-shrink-0">
          <img alt="" className="h-72 w-72" src={organiser.logo} />
          <div className="flex gap-2 justify-center text-2xl">
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
