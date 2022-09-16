const Event = ({ title, organiser, date, image }) => {
  return (
    <div className="bg-slate-400 h-60 rounded-xl text-sm w-40 transition-transform hover:scale-110">
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
    </div>
  );
};

export const DummyEvent = () => (
  <Event
    title={"E-Learning Stammtisch"}
    organiser={"Hochschuldidaktische Arbeitsstelle"}
    date={"  14. September, 15:00 Uhr"}
    image={
      "https://www.hda.tu-darmstadt.de/media/hda/zz_hda_medienarchiv/img/news_5/elearning__Stammtisch_Square_web_870x0.jpg"
    }
  />
);

export default Event;
