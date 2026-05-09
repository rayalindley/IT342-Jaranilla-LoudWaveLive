import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../shared/layouts/MainLayout";
import { Link } from "react-router-dom";
import '../../index.css'

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
                <h1 className="title">Explore Events</h1>

                <div className="events-grid">
                    {events.map(event => (
                    <div className="event-card" key={event.id}>
                        <img src={event.imageUrl} alt={event.title} className="event-image" />

                        <div className="event-info">
                        <h2>{event.title}</h2>
                        <p className="artist">{event.artist}</p>
                        <p className="date">
                            {new Date(event.date).toLocaleString()}
                        </p>
                        <p className="price">₱{event.price}</p>

                        <button className="buy-btn">
                            <Link to={`/event/${event.id}`}> Buy Ticket </Link>
                        </button>
                        </div>

                    </div>
                    ))}
                </div>
                </div>
        </MainLayout>
        </>
    )
}

export default Events;