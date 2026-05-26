import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../shared/layouts/MainLayout";
import { Link } from "react-router-dom";
import '../../styles/global.css'
import '../../styles/event.css'

const fallbackImage =
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80";

function Events() {
    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/events")
            .then(res => setEvents(res.data))
            .catch(err => console.error(err))
    }, []);

    return (
        <>
        <MainLayout>
            <div className="events-container">
                <p className="eyebrow">Event marketplace</p>
                <h1 className="title">Explore Events</h1>

                <div className="events-grid">
                    {events.map(event => (
                    <article className="event-card" key={event.eventId}>
                        <img src={event.imageUrl || fallbackImage} alt={event.title} className="event-image" />

                        <div className="event-info">
                        <h2>{event.title}</h2>
                        <p className="artist">{event.artist}</p>
                        <p className="date">
                            {new Date(event.date).toLocaleString()}
                        </p>

                        <Link className="buy-btn" to={`/events/${event.eventId}`}>Buy Ticket</Link>
                        </div>

                    </article>
                    ))}
                </div>
                </div>
        </MainLayout>
        </>
    )
}

export default Events;
