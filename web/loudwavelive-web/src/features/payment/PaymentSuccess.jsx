import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../../shared/layouts/MainLayout";

function PaymentSuccess() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [ticketData, setTicketData] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || "null");
                const ticketTypeId = parseInt(localStorage.getItem("ticketTypeId")) || null;
                const quantity = parseInt(localStorage.getItem("quantity")) || 1;
                const userId = user?.userId ?? user?.id;
                const sessionId = searchParams.get("session_id");

                console.log("Confirming payment with:", { ticketTypeId, quantity, userId, sessionId });

                if (!ticketTypeId || !userId) {
                    setError("Invalid payment data. Please try again.");
                    console.error("Missing ticketTypeId or userId", { ticketTypeId, userId });
                    return;
                }

                const response = await axios.post(
                    "http://localhost:8080/api/payment/confirm",
                    {
                        ticketTypeId,
                        quantity,
                        userId,
                        sessionId,
                    }
                );

                console.log("Ticket saved!", response.data);
                setTicketData(response.data);
                setUserEmail(response.data.userEmail);
                setSuccess(true);
                // Clear localStorage after successful payment
                localStorage.removeItem("ticketTypeId");
                localStorage.removeItem("quantity");

            } catch (error) {
                console.error("Payment confirmation failed:", error);
                let msg = "Failed to confirm payment";
                if (error?.response?.data) {
                    if (typeof error.response.data === "string") {
                        msg = error.response.data;
                    } else if (error.response.data?.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = JSON.stringify(error.response.data);
                    }
                } else if (error?.message) {
                    msg = error.message;
                }
                setError(`Error: ${msg}`);
            }
        };

        confirmPayment();
    }, []);

    return (
        <MainLayout>
            <div className="page-shell" style={{ textAlign: "center", maxWidth: "700px", margin: "60px auto" }}>
                {error ? (
                    <>
                        <h1>❌ Payment Processing Error</h1>
                        <p>{error}</p>
                    </>
                ) : success ? (
                    <>
                        <h1>✅ Payment Successful!</h1>
                        <p style={{ fontSize: "18px", marginBottom: "30px" }}>Thank you for your purchase!</p>
                        
                        <div style={{ 
                            backgroundColor: "rgba(255, 182, 217, 0.1)", 
                            border: "2px solid rgba(255, 182, 217, 0.3)", 
                            borderRadius: "12px", 
                            padding: "25px", 
                            marginBottom: "25px"
                        }}>
                            <p style={{ color: "#888", marginBottom: "15px", fontSize: "14px" }}>Your Ticket Code:</p>
                            <p style={{ 
                                fontSize: "24px", 
                                fontWeight: "bold", 
                                color: "#FF8FD1", 
                                letterSpacing: "2px",
                                fontFamily: "monospace",
                                margin: "0"
                            }}>
                                {ticketData?.ticketCode}
                            </p>
                        </div>

                        <div style={{ 
                            backgroundColor: "rgba(100, 200, 255, 0.05)", 
                            border: "1px solid rgba(100, 200, 255, 0.2)", 
                            borderRadius: "8px", 
                            padding: "15px",
                            marginBottom: "25px"
                        }}>
                            <p style={{ margin: "0", fontSize: "14px", color: "#aaa" }}>
                                ✉️ Digital ticket sent to<br/>
                                <strong style={{ color: "#fff" }}>{userEmail}</strong>
                            </p>
                        </div>

                        <div style={{ 
                            backgroundColor: "rgba(100, 255, 150, 0.05)", 
                            border: "1px solid rgba(100, 255, 150, 0.2)", 
                            borderRadius: "8px", 
                            padding: "15px",
                            marginBottom: "25px"
                        }}>
                            <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.6" }}>
                                Your digital ticket includes a QR code for entry verification. 
                                You can download it from the email or view it anytime in your "My Tickets" section.
                            </p>
                        </div>

                        <a href="/my-tickets" style={{
                            display: "inline-block",
                            backgroundColor: "#FF8FD1",
                            color: "#fff",
                            padding: "12px 30px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontWeight: "bold",
                            marginTop: "15px",
                            transition: "background-color 0.3s"
                        }}>
                            View My Tickets
                        </a>
                    </>
                ) : (
                    <>
                        <h1>Processing Payment...</h1>
                        <p>Please wait while we confirm your payment.</p>
                    </>
                )}
            </div>
        </MainLayout>
    );
}

export default PaymentSuccess;