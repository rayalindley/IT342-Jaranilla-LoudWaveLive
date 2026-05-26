import { Link } from "react-router-dom";
import MainLayout from "../../shared/layouts/MainLayout";

function PaymentCancel() {
  return (
    <MainLayout>
      <section className="payment-card surface-panel">
        <p className="eyebrow">Payment status</p>
        <h1>Payment Cancelled</h1>
        <p>Your checkout session was cancelled. You can return to events whenever you are ready.</p>
        <Link className="premium-link-btn" to="/events">
          Browse Events
        </Link>
      </section>
    </MainLayout>
  );
}

export default PaymentCancel;
