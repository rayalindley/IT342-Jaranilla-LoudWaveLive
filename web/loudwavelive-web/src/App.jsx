import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./features/event/Events";
import EventDetails from "./features/event/EventDetails";
import MyTickets from "./features/ticket/MyTickets";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import PaymentSuccess from "./features/payment/PaymentSuccess";
import PaymentCancel from "./features/payment/PaymentCancel";
import PartnerPage from "./features/organizer/PartnerPage";
import OrganizerDashboard from "./features/organizer/OrganizerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/organizer-dashboard" element={<OrganizerDashboard/>} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/mytickets" element={<MyTickets />} />
      <Route path="/payment-success" element={<PaymentSuccess/>} />
      <Route path="/payment-cancel" element={<PaymentCancel/>} />
    </Routes>
  );
}

export default App;