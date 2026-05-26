package edu.cit.jaranilla.loudwavelive.features.payment;

import java.time.LocalDateTime;

import edu.cit.jaranilla.loudwavelive.features.ticket.Ticket;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {
    private Long ticketId;
    private String userEmail;
    private Integer quantity;
    private LocalDateTime purchasedAt;
    private Double totalPrice;
    private String paymentStatus;
    private String ticketCode;
    private Long ticketTypeId;
    private String ticketTypeName;
    private String eventTitle;
    private Boolean emailSent;
    private String emailError;

    public static PaymentResponse fromTicket(Ticket ticket) {
        return fromTicket(ticket, null, null);
    }

    public static PaymentResponse fromTicket(Ticket ticket, Boolean emailSent, String emailError) {
        return PaymentResponse.builder()
                .ticketId(ticket.getTicketId())
                .userEmail(ticket.getUserEmail())
                .quantity(ticket.getQuantity())
                .purchasedAt(ticket.getPurchasedAt())
                .totalPrice(ticket.getTotalPrice())
                .paymentStatus(ticket.getPaymentStatus())
                .ticketCode(ticket.getTicketCode())
                .ticketTypeId(ticket.getTicketType().getTicketTypeId())
                .ticketTypeName(ticket.getTicketType().getName())
                .eventTitle(ticket.getTicketType().getEvent().getTitle())
                .emailSent(emailSent)
                .emailError(emailError)
                .build();
    }
}
