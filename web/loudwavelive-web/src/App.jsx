import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import MyTickets from "./pages/MyTickets";

function App() {
  return (
    <>
    <Home />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/mytickets" element={<MyTickets />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;