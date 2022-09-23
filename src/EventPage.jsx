import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Event, EventGroup } from "./Components";
import dummyData, {
  event1,
  event2,
  event3,
  event4,
  getEventById,
} from "./dummyData";
import Home from "./Home";

const EventPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const event = getEventById(Number.parseInt(params.id));

  const [fav, setFav] = useState(false);

  const sameOrgEvents = dummyData.events.filter(
    (e) => e.organiser.id === event.organiser.id && e.id !== event.id
  );

  return (
    <>
      <Home />
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => navigate(-1)}
      >
        <div
          className="mx-auto mt-16 bg-white rounded-xl overflow-hidden"
          style={{ width: "60rem" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="grid grid-cols-5 items-stretch justify-items-stretch"
            style={{ gridTemplateRows: "16rem max-content" }}
          >
            <img className="col-span-2 object-cover" src={event.image} alt="" />
            <div className="bg-neutral-200 col-span-3 p-10 text-right">
              <div className="font-medium text-2xl">{event.title}</div>
              <Link
                className="block hover:underline mb-4 text-neutral-500"
                to={`/organiser/${event.organiser.id}`}
              >
                {event.organiser.name}
              </Link>
              <div className="">{event.venue}</div>
              <div>{event.date}</div>
              <div className="flex-grow" />
              <div className="flex gap-10 justify-end mt-6">
                <div />
                <button
                  className={fav ? "text-red-700" : "text-neutral-600"}
                  onClick={() => setFav(!fav)}
                >
                  <FontAwesomeIcon
                    className="h-6"
                    icon={fav ? faSolidHeart : faRegularHeart}
                  />
                </button>
                <button className="text-neutral-600">
                  <FontAwesomeIcon className="h-6" icon={faShareFromSquare} />
                </button>
                <button className="bg-violet p-2 px-8 rounded-xl text-white">
                  Anmelden
                </button>
              </div>
              {/* <Link
                className="bg-slate-400 p-2 rounded-xl text-center"
                to={`/organiser/${event.organiser.id}`}
              >
                Veranstalter kontaktieren
              </Link> */}
            </div>
          </div>
          <div
            className="gap-10 grid grid-cols-5 items-stretch justify-items-stretch p-10 pb-0"
            style={{ gridTemplateRows: "20.5rem max-content" }}
          >
            <div className="col-span-3">
              <p>{event.desc}</p>
            </div>
            <img
              alt={event.venue}
              className="col-span-2 object-cover"
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
            <div
              className="bg-neutral-200 col-span-2 gap-2 grid p-4 rounded-xl"
              style={{ gridTemplateColumns: "1fr 2fr" }}
            >
              <div className="text-neutral-600">Adresse:</div>
              <div>{event.venue}</div>
              <div className="text-neutral-600">Preis:</div>
              <div>{event.price}</div>
            </div>
          </div>
          <div className="pb-10">
            {!!sameOrgEvents.length && (
              <EventGroup title="Weitere Events von diesem Veranstalter">
                {sameOrgEvents.map((e) => (
                  <Event key={e.id} event={e} />
                ))}
              </EventGroup>
            )}
            <EventGroup title="Ähnliche Events, die Dich interessieren könnten">
              <Event event={event3} />
              <Event event={event4} />
              <Event event={event1} />
              <Event event={event2} />
            </EventGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
