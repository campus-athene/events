const ComingSoon = () => {
  return (
    <div className="text-center text-slate-700 pb-72">
      <img
        src="https://www.study-campus.de/img/logo.svg"
        style={{
          display: "inline-block",
          height: "8rem",
          marginTop: "4rem",
          width: "8rem",
        }}
      />
      <p style={{ fontSize: "2rem", marginTop: "0rem" }}>Campus Events</p>
      <p style={{ fontSize: "1.2rem", marginTop: "10rem" }}>Coming soon</p>
      <p style={{ fontSize: "1.2rem", marginTop: "3rem" }}>
        Du bist Veranstalter an der TU Darmstadt? Melde Dich jetzt bei{" "}
        <a href="mailto:campus@oliverrm.de" className="underline">
          uns
        </a>
        .
      </p>
    </div>
  );
};

export default ComingSoon;
