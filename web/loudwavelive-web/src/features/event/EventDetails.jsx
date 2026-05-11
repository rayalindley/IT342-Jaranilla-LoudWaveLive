import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../shared/layouts/MainLayout";
import "../../index.css"

function EventDetails() {
    // const user = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const [ event, setEvent ] = useState(null);
    const [ quantity, setQuantity ] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/events`)
            .then(res => {
                const found = res.data.find(e => e.id == id);
                setEvent(found);
            });
    }, []);

    const handlePayment = async (ticketTypeId) => {
        try {
            localStorage.setItem("ticketTypeId", ticketTypeId);
            localStorage.setItem("quantity", quantity);

            const response = await axios.post(
                "http://localhost:8080/api/payment/create-checkout-session",
                {
                    ticketTypeId,
                    quantity
                }
            );

            // eslint-disable-next-line react-hooks/immutability
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

                    {event.ticketTypes.map((ticket) => (
                        <div key={ticket.id}>
                            <h3>{ticket.name}</h3>
                            <p>₱{ticket.price}</p>

                            <p>
                            Remaining:
                            {ticket.quantityAvailable - ticket.quantitySold}
                            </p>

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />

                            <button onClick={() => handlePayment(ticket.id)}>
                            Buy Ticket
                            </button>
                        </div>
                        ))}

                    {/* <button className="buy-btn" onClick={handlePayment}>
                        Buy Ticket
                    </button> */}
                </div>
            </div>
        </MainLayout>
    );
}

export default EventDetails;