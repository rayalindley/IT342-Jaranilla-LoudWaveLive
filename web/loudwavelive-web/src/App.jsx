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
import CreateEvent from "./features/organizer/CreateEvent";
import AdminDashboard from "./features/admin/AdminDashboard";
import ProtectedRoute from "./shared/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route
        path="/organizer-dashboard"
        element={
          <ProtectedRoute requiredRole="ORGANIZER">
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer/create-event"
        element={
          <ProtectedRoute requiredRole="ORGANIZER">
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mytickets"
        element={
          <ProtectedRoute>
            <MyTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/payment-cancel" element={<PaymentCancel/>} />
    </Routes>
  );
}

export default App;