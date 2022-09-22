import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useContext, useRef } from "react";
import { Link } from "react-router-dom";

const HeaderGroupContext = createContext(null);
export const HeaderGroup = ({ children, defaultValue }) => {
  return (
    <HeaderGroupContext.Provider value={defaultValue || ""}>
      <div className="flex gap-2 overflow-x-auto px-10 whitespace-nowrap">
        {children}
      </div>
    </HeaderGroupContext.Provider>
  );
};
export const Header = ({ children, className, value, ...props }) => {
  const context = useContext(HeaderGroupContext);

  if (context === null)
    return <h2 className={"pt-8 text-lg " + className}>{children}</h2>;

  return context === value || (context === "" && props.default) ? (
    <button className={"pt-8 text-lg " + className}>{children}</button>
  ) : (
    <button className={"pt-8 text-lg text-slate-400 " + className}>
      {children}
    </button>
  );
};
export const EventGroup = ({ className, children, title }) => {
  const scrollRef = useRef();

  const scroll = (f) => {
    if (!scrollRef.current) return;
    const tileWidth =
      (12 + 1) *
      parseFloat(getComputedStyle(document.documentElement).fontSize);
    const by =
      Math.floor(scrollRef.current.offsetWidth / tileWidth) * tileWidth * f;
    scrollRef.current.scrollBy({ behavior: "smooth", left: by });
    console.log({ width: scrollRef.current.offsetWidth, tileWidth, by });
  };

  return (
    <>
      {title && <Header className="mx-10">{title}</Header>}
      <div className="flex items-streach">
        <button
          className="flex-shrink-0 text-slate-300 hover:text-black w-10 transition-colors"
          onClick={() => scroll(-1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div
          id="myscroll"
          className={
            "flex flex-grow flex-shrink gap-4 pt-2 overflow-x-hidden flex-nowrap" +
            className
          }
          ref={scrollRef}
        >
          {children}
        </div>
        <button
          className="flex-shrink-0 text-slate-300 hover:text-black w-10 transition-colors"
          onClick={() => scroll(1)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </>
  );
};

const Event = ({ id, title, organiser, date, image }) => {
  return (
    <Link
      className="bg-slate-200 block h-56 rounded-xl text-sm w-48 transition-transform"
      to={`/event/${id}`}
    >
      <img
        className="h-32 object-cover rounded-t-xl w-48 mb-1"
        src={image}
        alt=""
      />
      <div className="overflow-hidden px-3 pt-1 text-ellipsis whitespace-nowrap font-medium">
        {title}
      </div>
      <Link
        className="block overflow-hidden px-3 pt-1 text-ellipsis whitespace-nowrap text-neutral-500 text-xs hover:underline"
        onClick={(e) => e.stopPropagation()}
        to="/organiser/1"
      >
        {organiser}
      </Link>
      <div className="overflow-hidden px-3 pt-1 text-ellipsis whitespace-nowrap text-xs">
        {date}
      </div>
      <a
        className="block overflow-hidden px-3 pt-1 text-ellipsis whitespace-nowrap text-xs hover:underline"
        href="https://maps.google.de"
        onClick={(e) => e.stopPropagation()}
      >
        S2|03&nbsp;123
      </a>
    </Link>
  );
};

export const Highlight = ({ id, title, organiser, date, image }) => {
  return (
    <Link
      className="bg-slate-200 rounded-xl text-sm flex flex-shrink-0"
      to={`/event/${id}`}
      style={{ width: "33rem" }}
    >
      <img
        className="h-32 object-cover rounded-l-xl w-54 flex-shrink-0"
        style={{ height: "9rem", width: "13.5rem" }}
        src={image}
        alt=""
      />
      <div className="flex-grow flex-shrink">
        <div className="overflow-hidden px-4 pt-3 text-ellipsis whitespace-nowrap text-xl font-medium">
          {title}
        </div>
        <Link
          className="block overflow-hidden px-4 pt-1 text-ellipsis whitespace-nowrap text-neutral-500 text-lg hover:underline"
          onClick={(e) => e.stopPropagation()}
          to="/organiser/1"
        >
          {organiser}
        </Link>
        <div className="overflow-hidden px-4 pt-1 text-ellipsis whitespace-nowrap">
          {date}
        </div>
        <a
          className="block overflow-hidden px-4 pt-1 text-ellipsis whitespace-nowrap hover:underline"
          href="https://maps.google.de"
          onClick={(e) => e.stopPropagation()}
        >
          S2|03&nbsp;123
        </a>
      </div>
    </Link>
  );
};

export const DummyEvent = () => (
  <Event
    id={1}
    title={"E-Learning Stammtisch"}
    organiser={"Hochschuldidaktische Arbeitsstelle"}
    date={"  14. Sept., 15:00 Uhr"}
    image={
      "https://www.hda.tu-darmstadt.de/media/hda/zz_hda_medienarchiv/img/news_5/elearning__Stammtisch_Square_web_870x0.jpg"
    }
  />
);

export const DummyHighlight = () => (
  <Highlight
    id={1}
    title={"E-Learning Stammtisch"}
    organiser={"Hochschuldidaktische Arbeitsstelle"}
    date={"  14. Sept., 15:00 Uhr"}
    image={
      "https://www.hda.tu-darmstadt.de/media/hda/zz_hda_medienarchiv/img/news_5/elearning__Stammtisch_Square_web_870x0.jpg"
    }
  />
);
export default Event;
