import { useEffect } from "react";
import axios from "axios";
import MainLayout from "../../shared/layouts/MainLayout";

function PaymentSuccess() {
    useEffect(() => {
        const confirmPayment = async () => {
            try {
                await axios.post(
                    "http://localhost:8080/api/payment/confirm",
                    {
                        ticketTypeId: localStorage.getItem("ticketTypeId"),
                        quantity: localStorage.getItem("quantity"),
                        userId: JSON.parse(localStorage.getItem("user")).id,
                        userEmail: JSON.parse(localStorage.getItem("user")).email,
                    }
                );

                console.log("Ticket saved!");

            } catch (error) {

                console.error(error);
            }
        };

        confirmPayment();
    }, []);

    return (
        <MainLayout>
            <h1>Payment Successful!</h1>
            <p>Your ticket has been purchased.</p>
        </MainLayout>
    );
}

export default PaymentSuccess;