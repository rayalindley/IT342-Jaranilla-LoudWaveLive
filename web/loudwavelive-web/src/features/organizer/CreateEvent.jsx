import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../shared/layouts/MainLayout";
import "../../index.css";

function CreateEvent() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [organizerId, setOrganizerId] = useState(null);
    const [loadingOrganizer, setLoadingOrganizer] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [description, setDescription] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [ticketTypes, setTicketTypes] = useState([
        {
            name: "",
            price: "",
            quantityAvailable: ""
        }
    ]);

    useEffect(() => {
        const fetchOrganizer = async () => {
            if (!user) {
                setMessage("You must be logged in as an organizer to create events.");
                setMessageType("error");
                setLoadingOrganizer(false);
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/organizers/user/${user.userId ?? user.id}`
                );
                setOrganizerId(response.data.organizerId);
                setMessage("");
                setMessageType("info");
            } catch (error) {
                console.error(error);
                setMessage("Unable to resolve your organizer profile. Please contact support.");
                setMessageType("error");
            } finally {
                setLoadingOrganizer(false);
            }
        };

        fetchOrganizer();
    }, []);

    const handleTicketChange = (index, field, value) => {
        const updatedTickets = [...ticketTypes];

        updatedTickets[index][field] = value;
        setTicketTypes(updatedTickets);
    };

    const addTicketType = () => {
        setTicketTypes([
            ...ticketTypes,
            {
                name: "",
                price: "",
                quantityAvailable: ""
            }
        ]);
    };

    const removeTicketType = (index) => {
        const updatedTickets = [...ticketTypes];
        updatedTickets.splice(index, 1);
        setTicketTypes(updatedTickets);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setMessage("Please sign in before creating an event.");
            setMessageType("error");
            return;
        }

        if (!organizerId) {
            setMessage("Your organizer profile is not available yet.");
            setMessageType("error");
            return;
        }

        try {
            const eventData = {
                title,
                artist,
                description,
                venue,
                date,
                imageUrl,
                organizerId,
                ticketTypes: ticketTypes.map((ticket) => ({
                    ...ticket,
                    price: Number(ticket.price),
                    quantityAvailable: Number(ticket.quantityAvailable)
                }))
            };

            await axios.post("http://localhost:8080/api/events", eventData);

            setMessage("Event submitted for admin approval.");
            setMessageType("success");

            setTitle("");
            setArtist("");
            setDescription("");
            setVenue("");
            setDate("");
            setImageUrl("");
            setTicketTypes([
                {
                    name: "",
                    price: "",
                    quantityAvailable: ""
                }
            ]);
        } catch (error) {
            console.error(error);
            setMessage("Failed to create event.");
            setMessageType("error");
        }
    };

    const canSubmit = !loadingOrganizer && Boolean(organizerId);

    return (
        <MainLayout>
            <div className="create-event-page">
                <div className="create-event-card">
                    <div className="create-event-header">
                        <div>
                            <p className="eyebrow">Organizer Studio</p>
                            <h1>Create Event</h1>
                            <p className="hero-copy">
                                Build a beautiful event listing with ticket details, artwork, and a modern landing page presentation.
                            </p>
                        </div>
                        {message && (
                            <div className={`status-pill ${messageType}`}>
                                {message}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={!canSubmit} className="form-fieldset">
                            <div className="form-group">
                                <label>Event Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                        <div className="form-group">
                            <label> Artist / Performer </label>

                            <input
                                type="text"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                required
                            />

                        </div>

                        <div className="form-group">
                            <label> Description </label>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label> Venue </label>

                            <input
                                type="text"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                required
                            />

                        </div>

                        <div className="form-group">
                            <label> Event Date </label>

                            <input
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label> Poster Image URL </label>

                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://..."
                                required
                            />
                        </div>

                        <div className="ticket-section">
                            <h2> Ticket Types </h2>

                            {ticketTypes.map((ticket, index) => (
                                <div className="ticket-type-card" key={index}>
                                    <input
                                        type="text"
                                        placeholder="Ticket Name"
                                        value={ticket.name}
                                        onChange={(e) => handleTicketChange(index, "name", e.target.value)}
                                        required
                                    />

                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={ticket.price}
                                        onChange={(e) => handleTicketChange(index, "price", e.target.value)}
                                        required
                                    />

                                    <input
                                        type="number"
                                        placeholder="Available Quantity"
                                        value={ticket.quantityAvailable}
                                        onChange={(e) => handleTicketChange(index, "quantityAvailable", e.target.value)}
                                        required
                                    />

                                    {ticketTypes.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-ticket-btn"
                                            onClick={() => removeTicketType(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button type="button" className="add-ticket-btn" onClick={addTicketType}>
                                + Add Ticket Type
                            </button>

                        </div>

                        </fieldset>

                        <button type="submit" className="create-event-btn" disabled={!canSubmit}>
                            Submit Event
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

export default CreateEvent;