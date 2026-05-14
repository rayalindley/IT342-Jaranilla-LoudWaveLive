package edu.cit.jaranilla.loudwavelive.features.payment;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import edu.cit.jaranilla.loudwavelive.features.auth.UserRepository;
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
    private final UserRepository userRepository;

    public Ticket buyTicket(Long ticketTypeId, Integer quantity, Long userId, String userEmail) {
        TicketType ticketType = ticketTypeRepository.findById(ticketTypeId).orElseThrow();

        int remaining = ticketType.getQuantityAvailable() - ticketType.getQuantitySold();

        if(quantity > remaining) {
            throw new RuntimeException("Not enough tickets available");
        }

        ticketType.setQuantitySold(ticketType.getQuantitySold() + quantity);

        ticketTypeRepository.save(ticketType);

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Account not found!"));

        Ticket ticket = Ticket.builder()
                .user(user)
                .userEmail(userEmail)
                .quantity(quantity)
                .ticketType(ticketType)
                .purchasedAt(LocalDateTime.now())
                .paymentStatus("PAID")
                .totalPrice(ticketType.getPrice() * quantity)
                .build();
                
        return ticketRepository.save(ticket);
    }
}