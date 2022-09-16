import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventPage from "./EventPage";
import Home from "./Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="event/:id" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
