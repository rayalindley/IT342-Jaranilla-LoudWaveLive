package edu.cit.jaranilla.loudwavelive.features.payment;

import edu.cit.jaranilla.loudwavelive.features.ticket.Ticket;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketType;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketRepository;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final TicketTypeRepository ticketTypeRepository;
    private final TicketRepository ticketRepository;

    public Ticket buyTicket(
        Long ticketTypeId,
        Integer quantity,
        String userId,
        String userEmail
    ) {

        TicketType ticketType = ticketTypeRepository
                .findById(ticketTypeId)
                .orElseThrow();

        int remaining =
                ticketType.getQuantityAvailable()
                - ticketType.getQuantitySold();

        if(quantity > remaining) {
            throw new RuntimeException(
                    "Not enough tickets available"
            );
        }

        ticketType.setQuantitySold(
                ticketType.getQuantitySold() + quantity
        );

        ticketTypeRepository.save(ticketType);

        Ticket ticket = Ticket.builder()
                .userId(String.valueOf(userId))
                .userEmail(userEmail)
                .quantity(quantity)
                .ticketType(ticketType)
                .purchasedAt(LocalDateTime.now())
                .paymentStatus("PAID")
                .totalPrice(
                        ticketType.getPrice() * quantity
                )
                .build();
                
        return ticketRepository.save(ticket);
    }
}