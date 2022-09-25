import { Route, Routes } from "react-router-dom";
import EventPage from "./EventPage";
import Home from "./Home";
import OrganiserPage from "./OrganiserPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="event/:id" element={<EventPage />} />
      <Route path="organiser/:id" element={<OrganiserPage />} />
    </Routes>
  );
};

export default Router;
