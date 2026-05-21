import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";

export default function Home() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [selectedVenue, setSelectedVenue] =
    useState("All Venues");

  useEffect(() => {

    axios
      .get("http://localhost:8080/api/events")
      .then((response) => {

        setEvents(response.data);

      })
      .catch((error) => {

        console.error(error);

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

  return (
    <MainLayout>

      {/* HERO SECTION */}

      <section className="hero-section">
        <div className="hero-overlay">

          <h1 className="hero-title">
            Experience Live Music Like Never Before
          </h1>

          <p className="hero-subtitle">
            Discover concerts, festivals, and unforgettable moments.
          </p>

          <Link to="/events">
            <button className="cta-button">
              Explore Events
            </button>
          </Link>

        </div>
      </section>

      {/* UPCOMING EVENTS */}

      <section className="upcoming-section">

        <div className="upcoming-header">

          <div>
            <h2 className="section-title">
              Upcoming Events
            </h2>

            <p className="section-subtitle">
              Discover amazing live performances
            </p>
          </div>

          <div className="filters">

            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
            >
              <option>All Categories</option>
            </select>

            <select
              className="filter-select"
              value={selectedVenue}
              onChange={(e) =>
                setSelectedVenue(e.target.value)
              }
            >
              <option>All Venues</option>
            </select>

          </div>

        </div>

        {/* LOADING */}

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

              <div
                key={event.eventId}
                className="event-card"
              >

                <img
                  src={
                    event.imageUrl ||
                    "https://via.placeholder.com/500x300?text=LoudWave+Live"
                  }
                  alt={event.title}
                  className="event-image"
                />

                <div className="event-info">

                  <h3 className="event-title">
                    {event.title}
                  </h3>

                  <p className="event-date">
                    📅{" "}
                    {new Date(event.date)
                      .toLocaleDateString()}
                  </p>

                  <p className="event-venue">
                    📍 {event.venue}
                  </p>

                  <p className="event-price">

                    {event.ticketTypes &&
                    event.ticketTypes.length > 0
                      ? `Starts at ₱${event.ticketTypes[0].price}`
                      : "Ticket unavailable"}

                  </p>

                  <Link
                    to={`/events/${event.eventId}`}
                  >
                    <button className="view-details-btn">
                      View Details
                    </button>
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </MainLayout>
  );
}