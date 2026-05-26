import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import MainLayout from "../../shared/layouts/MainLayout";
import "../../styles/global.css";
import "../../styles/organizer.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80";

function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "null"), []);

  useEffect(() => {
    if (!user) return;

    const userId = user.userId ?? user.id;
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/organizers/user/${userId}`)
      .then((res) => {
        const organizer = res.data;
        return axios.get(`http://localhost:8080/api/events/organizer/${organizer.organizerId}`);
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <MainLayout>
      <div className="events-page">
        <div className="section-head">
          <div>
            <p className="eyebrow">Organizer Studio</p>
            <h1>Dashboard</h1>
            <p className="subhead">Track your event lineup and move from planning to launch with a clean production workspace.</p>
          </div>
          <button onClick={() => (window.location.href = "/organizer/create-event")}>Create Event</button>
        </div>

        {events.length === 0 ? (
          <div className="table-empty-state">No events created yet.</div>
        ) : (
          <div className="event-grid">
            {events.map((event) => (
              <article className="event-card" key={event.eventId}>
                <img src={event.imageUrl || fallbackImage} alt={event.title} className="event-image" />
                <div className="event-info">
                  <h2>{event.title}</h2>
                  <p>{event.venue}</p>
                  <p>{new Date(event.date).toLocaleString()}</p>
                  <span className={`status-pill ${event.status?.toLowerCase()}`}>Status: {event.status}</span>
                  <button onClick={() => (window.location.href = `/organizer/event/${event.eventId}`)}>Manage</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default OrganizerDashboard;
