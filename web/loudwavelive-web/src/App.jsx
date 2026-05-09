import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
<<<<<<< Updated upstream
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyTickets from "./pages/MyTickets";
import Login from "./pages/Login";
import Register from "./pages/Register";
=======
import Events from "./features/event/Events";
import EventDetails from "./features/event/EventDetails";
import MyTickets from "./features/ticket/MyTickets";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import PaymentSuccess from "./features/payment/PaymentSuccess";
import PaymentCancel from "./features/payment/PaymentCancel";
>>>>>>> Stashed changes

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/mytickets" element={<MyTickets />} />
      <Route path="/payment-success" element={<PaymentSuccess/>} />
      <Route path="/payment-cancel" element={<PaymentCancel/>} />
    </Routes>
  );
}

export default App;