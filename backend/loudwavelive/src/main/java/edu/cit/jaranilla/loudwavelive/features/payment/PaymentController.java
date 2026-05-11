package edu.cit.jaranilla.loudwavelive.features.payment;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import edu.cit.jaranilla.loudwavelive.features.ticket.Ticket;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketType;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketTypeRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PaymentController {
        private final TicketTypeRepository ticketTypeRepository;
        private final PaymentService paymentService;

        @Value("${stripe.secret.key}")
        private String stripeSecretKey;

        @PostMapping("/create-checkout-session")
        public Map<String, String> createCheckoutSession(@RequestBody PurchaseRequest request) throws Exception {
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
                                .setSuccessUrl("http://localhost:5173/payment-success")
                                .setCancelUrl("http://localhost:5173/payment-cancel")
                                .addLineItem(lineItem)
                                .build();

                Session session = Session.create(params);

                return Map.of("url", session.getUrl());
        }

        @PostMapping("/confirm")
        public Ticket confirmPayment(@RequestBody PurchaseRequest request) {
                return paymentService.buyTicket(
                        request.getTicketTypeId(),
                        request.getQuantity(),
                        request.getUserId(),
                        request.getUserEmail()
                );
        }
}