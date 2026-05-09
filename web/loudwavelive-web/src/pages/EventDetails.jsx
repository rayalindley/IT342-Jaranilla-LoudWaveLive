import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
<<<<<<< Updated upstream:web/loudwavelive-web/src/pages/EventDetails.jsx
import MainLayout from "../layouts/MainLayout";
import "../index.css"
=======
import MainLayout from "../../shared/layouts/MainLayout";
import "../../index.css"
>>>>>>> Stashed changes:web/loudwavelive-web/src/features/event/EventDetails.jsx

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

    // const handlePurchase = async () => {
    //     await axios.post("http://localhost:8080/api/tickets", {
    //         userId: 1,
    //         eventId: event.id
    //     });

    //     alert("You have successfully purchased your ticket!");
    // };

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8080/api/payment/create-checkout-session",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            window.location.href = response.data.url;

        } catch (error) {
            console.error(error);
            alert("Payment failed");
        }
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

<<<<<<< Updated upstream:web/loudwavelive-web/src/pages/EventDetails.jsx
                    <div>
                        <button> - </button>
                        <input type="number" id="quantity" value="1"></input>
                        <button> + </button>
                    </div>

                    <button className="buy-btn" onClick={handlePurchase}>
=======
                    <button className="buy-btn" onClick={handlePayment}>
>>>>>>> Stashed changes:web/loudwavelive-web/src/features/event/EventDetails.jsx
                        Buy Ticket
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}

export default EventDetails;