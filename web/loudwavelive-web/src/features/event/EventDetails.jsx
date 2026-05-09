import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../shared/layouts/MainLayout";
import "../../index.css"

function EventDetails() {
    const { id } = useParams();
    const [ event, setEvent ] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/events`)
            .then(res => {
                const found = res.data.find(e => e.id == id);
                setEvent(found);
            });
    }, []);

    const handlePurchase = async () => {
        await axios.post("http://localhost:8080/api/tickets", {
            userId: 1,
            eventId: event.id
        });

        alert("You have successfully purchased your ticket!");
    };

    if (!event) return <p> Loading... </p>;

    return(
        <MainLayout>
            <div className="event-details-container">
                <img src={event.imageUrl} alt={event.title} className="banner"/>

                <div className="details">
                    <h1>{event.title}</h1>
                    <p className="artist">{event.artist}</p>

                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                    <p><strong>Price:</strong> ₱{event.price}</p>

                    <button className="buy-btn" onClick={handlePurchase}>
                        Buy Ticket
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}

export default EventDetails;