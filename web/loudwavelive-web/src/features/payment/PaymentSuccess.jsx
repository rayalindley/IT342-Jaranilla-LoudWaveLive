import { useEffect } from "react";
import axios from "axios";

function PaymentSuccess() {

  useEffect(() => {

    const saveTicket = async () => {

      const ticketData = {

        userId: 1,

        userEmail: localStorage.getItem("email"),

        eventId: localStorage.getItem("eventId"),

        quantity: 1
      };

      try {

        await axios.post(
          "http://localhost:8080/api/tickets/buy",
          ticketData
        );

        console.log("Ticket saved!");

      } catch (error) {

        console.error(error);
      }
    };

    saveTicket();

  }, []);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your ticket has been purchased.</p>
    </div>
  );
}

export default PaymentSuccess;