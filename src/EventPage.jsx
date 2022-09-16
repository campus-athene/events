import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { DummyEvent, EventGroup } from "./Event";

const EventPage = () => {
  const event = {
    id: 3,
    title: "E-Learning Stammtisch",
    organiser: "Hochschuldidaktische Arbeitsstelle",
    date: "14. September, 15:00 Uhr",
    venue: "Online Event",
    desc: `
    In hybriden Lehrsettings nimmt ein Teil der Studierenden in Präsenz vor Ort an der Universität, der andere Teil der Studierenden online (z.B. von zu Hause) an der jeweiligen Lehrveranstaltung teil. Je nach Charakter der Lehrveranstaltung sind unterschiedliche Szenarien hierbei geeignet. Die Online-Teilnahme kann synchron oder asynchron stattfinden. Online- und Präsenz-Teilnahme sind gegebenenfalls im Wechsel organisiert. Die Durchführung von hybrider Lehre stellt somit vielfältige didaktische und technische Herausforderungen an Lehrende und Studierende, bietet aber gleichzeitig neue Möglichkeiten und flexible Zugänge.
    Im Rahmen dieses Stammtisches berichtet Prof. Dr. Andy Schürr aus dem Fachbereich Elektro- und Informationstechnik an der TU Darmstadt über seine gemachten Erfahrungen mit dem Einsatz hybrider Lehrkonzepte im Sommersemester 2022.`,
    image:
      "https://www.hda.tu-darmstadt.de/media/hda/zz_hda_medienarchiv/img/news_5/elearning__Stammtisch_Square_web_870x0.jpg",
  };

  const [fav, setFav] = useState(false);

  return (
    <>
      <div className="flex">
        <div className="bg-neutral-200 flex flex-col gap-2 h-72 p-8 w-72">
          <div>{event.organiser}</div>
          <div>{event.location}</div>
          <div>{event.date}</div>
          <div className="flex gap-4 justify-end">
            <button onClick={() => setFav(!fav)}>
              <FontAwesomeIcon
                className="h-6"
                icon={fav ? faSolidHeart : faRegularHeart}
              />
            </button>
            <button>
              <FontAwesomeIcon className="h-6" icon={faShareFromSquare} />
            </button>
          </div>
          <button className="bg-violet p-2 rounded-xl text-white">
            Anmelden
          </button>
          <button className="bg-slate-400 p-2 rounded-xl">
            Veranstalter kontaktieren
          </button>
        </div>
        <img className="flex-grow h-72 object-cover" src={event.image} alt="" />
      </div>
      <div className="flex">
        <div className="mr-4 mt-4">
          <h1 className="mb-2 text-xl">{event.title}</h1>
          <p>{event.desc}</p>
        </div>
        <img
          alt={event.venue}
          className="object-cover"
          src="https://tile.openstreetmap.org/16/34344/22261.png"
        />
      </div>
      <EventGroup title="Weitere Events von diesem Veranstalter">
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
      <EventGroup title="Ähnliche Events, die Dich interessieren könnten">
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
        <DummyEvent />
      </EventGroup>
    </>
  );
};

export default EventPage;
