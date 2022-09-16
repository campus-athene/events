import { createContext, useContext } from "react";
import { Link } from "react-router-dom";

const HeaderGroupContext = createContext(null);
export const HeaderGroup = ({ children, defaultValue }) => {
  return (
    <HeaderGroupContext.Provider value={defaultValue || ""}>
      <div className="flex gap-2">{children}</div>
    </HeaderGroupContext.Provider>
  );
};
export const Header = ({ children, value, ...props }) => {
  const context = useContext(HeaderGroupContext);

  if (context === null) return <h2 className="pt-8 text-lg">{children}</h2>;

  return context === value || (context === "" && props.default) ? (
    <button className="pt-8 text-lg">{children}</button>
  ) : (
    <button className="pt-8 text-slate-400 text-lg">{children}</button>
  );
};
export const EventGroup = ({ children, title }) => (
  <>
    {title && <Header>{title}</Header>}
    <div className="flex flex-wrap gap-4 pt-2">{children}</div>
  </>
);

const Event = ({ id, title, organiser, date, image }) => {
  return (
    <Link
      className="bg-slate-400 h-60 rounded-xl text-sm w-40 transition-transform hover:scale-110"
      to={`/event/${id}`}
    >
      <img className="h-40 rounded-t-xl w-40" src={image} alt="" />
      <div className="overflow-hidden px-2 pt-1 text-ellipsis whitespace-nowrap">
        {organiser}
      </div>
      <div className="overflow-hidden px-2 pt-1 text-ellipsis whitespace-nowrap">
        {title}
      </div>
      <div className="overflow-hidden px-2 pt-1 text-ellipsis whitespace-nowrap">
        {date}
      </div>
    </Link>
  );
};

export const DummyEvent = () => (
  <Event
    id={1}
    title={"E-Learning Stammtisch"}
    organiser={"Hochschuldidaktische Arbeitsstelle"}
    date={"  14. September, 15:00 Uhr"}
    image={
      "https://www.hda.tu-darmstadt.de/media/hda/zz_hda_medienarchiv/img/news_5/elearning__Stammtisch_Square_web_870x0.jpg"
    }
  />
);

export default Event;
