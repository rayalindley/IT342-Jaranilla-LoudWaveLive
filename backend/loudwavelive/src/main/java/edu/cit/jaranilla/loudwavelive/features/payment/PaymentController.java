package edu.cit.jaranilla.loudwavelive.features.payment;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketType;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
import edu.cit.jaranilla.loudwavelive.features.payment.PaymentResponse;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PaymentController {
        private final TicketTypeRepository ticketTypeRepository;
        private final PaymentService paymentService;

        @Value("${stripe.secret.key:}")
        private String stripeSecretKey;

        @PostMapping("/create-checkout-session")
        public Map<String, String> createCheckoutSession(@RequestBody PurchaseRequest request) throws Exception {
                if (stripeSecretKey == null || stripeSecretKey.isBlank()) {
                        throw new RuntimeException("Stripe secret key is not configured.");
                }
                Stripe.apiKey = stripeSecretKey;

                TicketType ticketType = ticketTypeRepository
                        .findById(request.getTicketTypeId())
                        .orElseThrow();

                int remaining = ticketType.getQuantityAvailable() - ticketType.getQuantitySold();

                if(request.getQuantity() > remaining) {
                        throw new RuntimeException("Not enough tickets available");
                }

                long unitAmount =
                        (long)(ticketType.getPrice() * 100);

                SessionCreateParams.LineItem.PriceData.ProductData productData =
                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName(ticketType.getName())
                                .build();

                SessionCreateParams.LineItem.PriceData priceData =
                        SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("php")
                                .setUnitAmount(unitAmount)
                                .setProductData(productData)
                                .build();

                SessionCreateParams.LineItem lineItem =
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(request.getQuantity().longValue())
                                .setPriceData(priceData)
                                .build();

                SessionCreateParams params =
                        SessionCreateParams.builder()
                                .setMode(SessionCreateParams.Mode.PAYMENT)
                                .setSuccessUrl("http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}")
                                .setCancelUrl("http://localhost:5173/payment-cancel")
                                .addLineItem(lineItem)
                                .setBillingAddressCollection(SessionCreateParams.BillingAddressCollection.AUTO)
                                .addAllExpand(java.util.List.of("customer_details"))
                                .build();

                Session session = Session.create(params);

                return Map.of("url", session.getUrl());
        }

        @PostMapping("/confirm")
        public ResponseEntity<?> confirmPayment(@RequestBody PurchaseRequest request) {
                try {
                        if (request.getTicketTypeId() == null || request.getQuantity() == null || request.getUserId() == null) {
                                return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields: ticketTypeId, quantity, userId"));
                        }

                        String userEmail = null;
                        
                        // Priority 1: Try to retrieve email from Stripe session (this is the customer-entered email)
                        if (request.getSessionId() != null && !request.getSessionId().isBlank()) {
                                if (stripeSecretKey == null || stripeSecretKey.isBlank()) {
                                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Stripe secret key is not configured"));
                                }
                                Stripe.apiKey = stripeSecretKey;
                                
                                try {
                                        Session session = Session.retrieve(request.getSessionId());
                                        // Try to get email from customer_details (new approach)
                                        if (session.getCustomerDetails() != null && session.getCustomerDetails().getEmail() != null) {
                                                userEmail = session.getCustomerDetails().getEmail();
                                        } else if (session.getCustomerEmail() != null) {
                                                // Fallback to customerEmail field
                                                userEmail = session.getCustomerEmail();
                                        }
                                } catch (Exception e) {
                                        System.err.println("Warning: Could not retrieve Stripe session: " + e.getMessage());
                                }
                        }
                        
                        // Priority 2: Fall back to request email if Stripe email not found
                        if (userEmail == null || userEmail.isBlank()) {
                                userEmail = request.getUserEmail();
                        }
                        
                        // Ensure we have an email
                        if (userEmail == null || userEmail.isBlank()) {
                                return ResponseEntity.badRequest().body(Map.of("error", "User email is required"));
                        }

                        PaymentResponse response = paymentService.buyTicket(
                                request.getTicketTypeId(),
                                request.getQuantity(),
                                request.getUserId(),
                                userEmail
                        );
                        return ResponseEntity.ok(response);
                } catch (Exception e) {
                        e.printStackTrace();
                        System.err.println("Payment error: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Payment failed: " + e.getMessage()));
                }
        }
        
        @ExceptionHandler(RuntimeException.class)
        public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
}