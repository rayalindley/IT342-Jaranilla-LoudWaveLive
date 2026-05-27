import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/global.css";
import "../../styles/tickets.css";
import MainLayout from "../../shared/layouts/MainLayout";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const userId = user.userId ?? user.id;
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/tickets/user/${userId}`)
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  if (!user) {
    return (
      <MainLayout>
        <div className="tickets-page">
          <div className="table-empty-state">Please login first.</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
        <div className="tickets-page">
        <p className="eyebrow">Ticket wallet</p>
        <h1>My Tickets</h1>

        {tickets.length === 0 ? (
            <p>No tickets purchased yet.</p>
        ) : (
            <div className="ticket-list">
            {tickets.map((ticket) => (
                <div className="ticket-card" key={ticket.ticketId}>
                <h2>Ticket #{ticket.ticketId}</h2>
                <p>Event: {ticket.ticketType?.event?.title || "Unknown Event"} </p>
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
