import { useEffect, useState } from "react";
import axios from "axios";
import "../../index.css";
import MainLayout from "../../shared/layouts/MainLayout";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:8080/api/tickets/user/${user.id}`)
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) {
    return <h2>Please login first.</h2>;
  }

  return (
    <MainLayout>
        <div className="tickets-page">
        <h1>My Tickets</h1>

        {tickets.length === 0 ? (
            <p>No tickets purchased yet.</p>
        ) : (
            <div className="ticket-list">
            {tickets.map((ticket) => (
                <div className="ticket-card" key={ticket.id}>
                <h2>Ticket #{ticket.id}</h2>
                <p>Event:  {ticket.ticketType?.event?.title || "Unknown Event"} </p>
                <p>Quantity: {ticket.quantity}</p>
                <p>Status: {ticket.paymentStatus}</p>
                <p>
                    Purchased:{" "}
                    {new Date(ticket.purchasedAt).toLocaleString()}
                </p>
                </div>
            ))}
            </div>
        )}
        </div>
    </MainLayout>
  );
}

export default MyTickets;