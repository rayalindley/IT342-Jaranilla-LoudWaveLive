import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";

const fallbackImage =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedVenue, setSelectedVenue] = useState("All Venues");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <section className="hero-section">
        <div className="hero-overlay">
          <p className="eyebrow">LoudWave Live</p>
          <h1 className="hero-title">Premium access to unforgettable live events.</h1>
          <p className="hero-subtitle">
            Discover concerts, festivals, and curated nights with a ticketing experience built to feel as polished as the show.
          </p>
          <Link to="/events">
            <button className="cta-button">Explore Events</button>
          </Link>
        </div>
      </section>

      <section className="upcoming-section">
        <div className="upcoming-header">
          <div>
            <p className="eyebrow">On the radar</p>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">
              Browse premium live experiences, from intimate artist nights to festival-scale shows.
            </p>
          </div>

          <div className="filters">
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
            </select>
            <select
              className="filter-select"
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
            >
              <option>All Venues</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <p>Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="empty-container">
            <p>No events available.</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <article key={event.eventId} className="event-card">
                <img src={event.imageUrl || fallbackImage} alt={event.title} className="event-image" />
                <div className="event-info">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p className="event-venue">Venue: {event.venue}</p>
                  <p className="event-price">
                    {event.ticketTypes?.length ? `Starts at PHP ${event.ticketTypes[0].price}` : "Ticket unavailable"}
                  </p>
                  <Link to={`/events/${event.eventId}`}>
                    <button className="view-details-btn">View Details</button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
