import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DummyEvent, EventGroup } from "./Event";
import Home from "./Home";

const EventPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const event = {
    id: params.id,
    title: "E-Learning Stammtisch",
    organiser: { id: 2, name: "Hochschuldidaktische Arbeitsstelle" },
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
      <Home />
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => navigate(-1)}
      >
        <div
          className="mx-auto mt-16 bg-white rounded-xl overflow-hidden"
          style={{ width: "72rem" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="grid grid-cols-6 items-stretch justify-items-stretch"
            style={{ gridTemplateRows: "24rem max-content" }}
          >
            <div className="bg-neutral-200 col-span-3 p-10">
              <div className="font-semibold text-lg">{event.title}</div>
              <Link
                className="hover:underline text-neutral-500"
                to={`/organiser/${event.organiser.id}`}
              >
                {event.organiser.name}
              </Link>
              <div className="mb-4">{event.location}</div>
              <div>{event.date}</div>
              <div className="flex-grow" />
              <button className="bg-violet p-2 rounded-xl text-white">
                Anmelden
              </button>
              <div className="flex gap-4 justify-evenly mt-2">
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
              {/* <Link
                className="bg-slate-400 p-2 rounded-xl text-center"
                to={`/organiser/${event.organiser.id}`}
              >
                Veranstalter kontaktieren
              </Link> */}
            </div>
            <img className="col-span-3 object-cover" src={event.image} alt="" />
            <div className="col-span-4 p-4 pl-10">
              <p>{event.desc}</p>
            </div>
            <img
              alt={event.venue}
              className="col-span-2 h-96 object-cover"
              src="https://tile.openstreetmap.org/16/34344/22261.png"
            />
            {/* <iframe
              className="col-span-2 h-96 bg-slate-400"
              title="Veranstaltungsort"
              frameBorder="0"
              src="https://www.bing.com/maps/embed?h=400&amp;w=500&amp;cp=49.999795027127405~4022.999725341797&amp;lvl=11&amp;typ=d&amp;sty=r&amp;src=SHELL&amp;FORM=MBEDV8"
              scrolling="no"
            ></iframe> */}
            {/* <div style="white-space: nowrap; text-align: center; width: 500px; padding: 6px 0;">
              <a id="largeMapLink" target="_blank" href="https://www.bing.com/maps?cp=49.999795027127405~4022.999725341797&amp;sty=r&amp;lvl=11&amp;FORM=MBEDLD">View Larger Map</a> &nbsp; | &nbsp;
              <a id="dirMapLink" target="_blank" href="https://www.bing.com/maps/directions?cp=49.999795027127405~4022.999725341797&amp;sty=r&amp;lvl=11&amp;rtp=~pos.49.999795027127405_4022.999725341797____&amp;FORM=MBEDLD">Get Directions</a>
            </div> */}
          </div>
          <div className="pb-10">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
