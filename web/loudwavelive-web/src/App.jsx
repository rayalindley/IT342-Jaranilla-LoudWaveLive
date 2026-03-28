import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import MyTickets from "./pages/MyTickets";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events" element={<Events />} />
      <Route path="/mytickets" element={<MyTickets />} />
    </Routes>
  );
}

export default App;