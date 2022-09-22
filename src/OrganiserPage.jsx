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
import { DummyEvent, EventGroup } from "./Event";

const OrganiserPage = () => {
  const organiser = {
    name: "Hochschuldidaktische Arbeitsstelle",
    desc: `
        In hybriden Lehrsettings nimmt ein Teil der Studierenden in Präsenz vor Ort an der Universität, der andere Teil der Studierenden online (z.B. von zu Hause) an der jeweiligen Lehrveranstaltung teil. Je nach Charakter der Lehrveranstaltung sind unterschiedliche Szenarien hierbei geeignet. Die Online-Teilnahme kann synchron oder asynchron stattfinden. Online- und Präsenz-Teilnahme sind gegebenenfalls im Wechsel organisiert. Die Durchführung von hybrider Lehre stellt somit vielfältige didaktische und technische Herausforderungen an Lehrende und Studierende, bietet aber gleichzeitig neue Möglichkeiten und flexible Zugänge.
        Im Rahmen dieses Stammtisches berichtet Prof. Dr. Andy Schürr aus dem Fachbereich Elektro- und Informationstechnik an der TU Darmstadt über seine gemachten Erfahrungen mit dem Einsatz hybrider Lehrkonzepte im Sommersemester 2022.`,
    headerImg:
      "https://www.hda.tu-darmstadt.de/media/hda/hda_dachseite/01_start_hda/StartseiteHDA_Buehnenbild_Campus-27_ellenlewis.jpg",
    logo: "https://www.hda.tu-darmstadt.de/media/hda/zentrale_hda_medien/2013-10-hda-logo_1024px.png",
  };
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
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <EventGroup title="Seminare">
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <EventGroup title="Ähnliche Events von anderen Veranstaltern">
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
    </>
  );
};

export default OrganiserPage;
