import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../shared/layouts/MainLayout";
import "../../styles/global.css";
import "../../styles/event.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setError(null);
    axios
      .get("http://localhost:8080/api/events")
      .then((res) => {
        const found = res.data.find((e) => String(e.eventId) === String(id));
        if (!found) {
          setError("Event not found.");
          return;
        }
        setEvent(found);
      })
      .catch((err) => {
        console.error(err);
        setError(err?.response?.data || err.message || "Failed to load event details.");
      });
  }, [id]);

  const handlePayment = async (ticketTypeId) => {
    try {
      const qty = parseInt(quantity) || 1;
      if (qty < 1) {
        alert("Please enter a valid quantity.");
        return;
      }

      localStorage.setItem("ticketTypeId", ticketTypeId);
      localStorage.setItem("quantity", qty);

      const response = await axios.post("http://localhost:8080/api/payment/create-checkout-session", {
        ticketTypeId,
        quantity: qty,
      });

      if (!response.data?.url) {
        alert("Failed to create payment session.");
        return;
      }

      // eslint-disable-next-line react-hooks/immutability
      window.location.href = response.data.url;
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.response?.data || err.message || "Payment failed";
      alert(`Payment failed: ${msg}`);
    }
  };

  if (error) {
    return (
      <MainLayout>
        <div className="event-details-container">
          <div className="table-empty-state">{error}</div>
        </div>
      </MainLayout>
    );
  }

  if (!event) {
    return (
      <MainLayout>
        <div className="event-details-container">
          <div className="loading-container">Loading event...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="event-details-container">
        <img src={event.imageUrl || fallbackImage} alt={event.title} className="banner" />

        <section className="details">
          <p className="eyebrow">Live event</p>
          <h1>{event.title}</h1>
          <p className="artist">{event.artist}</p>
          <p>{event.description}</p>
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleString()}
          </p>

          {event.ticketTypes?.map((ticket) => (
            <div key={ticket.ticketTypeId}>
              <h3>{ticket.name}</h3>
              <p>PHP {ticket.price}</p>
              <p>Remaining: {ticket.quantityAvailable - ticket.quantitySold}</p>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                aria-label={`Quantity for ${ticket.name}`}
              />
              <button onClick={() => handlePayment(ticket.ticketTypeId)}>Buy Ticket</button>
            </div>
          ))}
        </section>
      </div>
    </MainLayout>
  );
}

export default EventDetails;
