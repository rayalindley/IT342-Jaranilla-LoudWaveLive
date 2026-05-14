import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../shared/layouts/MainLayout";
// import "../../events/events.css";

function OrganizerDashboard() {

    const [events, setEvents] = useState([]);

    const user =
        JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (!user) return;

        axios
            .get(
                `http://localhost:8080/api/events/organizer/${user.userId}`
            )
            .then((res) => {
                setEvents(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

    }, []);

    return (
        <MainLayout>

            <div className="events-page">

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <h1>Organizer Dashboard</h1>

                    <button
                        onClick={() =>
                            window.location.href =
                                "/organizer/create-event"
                        }
                    >
                        Create Event
                    </button>

                </div>

                <div className="event-grid">

                    {events.map((event) => (

                        <div
                            className="event-card"
                            key={event.id}
                        >

                            <img
                                src={event.imageUrl}
                                alt={event.title}
                            />

                            <div className="event-info">

                                <h2>{event.title}</h2>

                                <p>{event.venue}</p>

                                <p>
                                    {new Date(
                                        event.date
                                    ).toLocaleString()}
                                </p>

                                <p>
                                    Status:
                                    {" "}
                                    {event.status}
                                </p>

                                <button
                                    onClick={() =>
                                        window.location.href =
                                            `/organizer/event/${event.eventId}`
                                    }
                                >
                                    Manage
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </MainLayout>
    );
}

export default OrganizerDashboard;