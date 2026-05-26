package edu.cit.jaranilla.loudwavelive.features.payment;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import edu.cit.jaranilla.loudwavelive.features.auth.UserRepository;
import edu.cit.jaranilla.loudwavelive.features.notification.EmailService;
import edu.cit.jaranilla.loudwavelive.features.ticket.Ticket;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketCodeService;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketPdfService;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketType;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketRepository;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);
    
    private final TicketTypeRepository ticketTypeRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketCodeService ticketCodeService;
    private final TicketPdfService ticketPdfService;
    private final EmailService emailService;

    @Transactional
    public PaymentResponse buyTicket(Long ticketTypeId, Integer quantity, Long userId, String userEmail) {
        TicketType ticketType = ticketTypeRepository.findById(ticketTypeId).orElseThrow();

        int remaining = ticketType.getQuantityAvailable() - ticketType.getQuantitySold();

        if(quantity > remaining) {
            throw new RuntimeException("Not enough tickets available");
        }

        ticketType.setQuantitySold(ticketType.getQuantitySold() + quantity);
        ticketType.setQuantityAvailable(ticketType.getQuantityAvailable() - quantity);

        ticketTypeRepository.save(ticketType);

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Account not found!"));

        // Generate unique ticket code
        String ticketCode = ticketCodeService.generateTicketCode();
        String ticketReference = ticketCodeService.generateTicketReference();

        Ticket ticket = Ticket.builder()
                .user(user)
                .userEmail(userEmail)
                .quantity(quantity)
                .ticketType(ticketType)
                .ticketCode(ticketCode)
                .purchasedAt(LocalDateTime.now())
                .paymentStatus("PAID")
                .totalPrice(ticketType.getPrice() * quantity)
                .build();
                
        Ticket savedTicket = ticketRepository.save(ticket);

        boolean emailSent = false;
        String emailError = null;

        try {
            generateAndSendTicket(savedTicket, ticketReference, user.getFirstName());
            emailSent = true;
        } catch (Exception e) {
            emailError = e.getMessage();
            logger.error("Failed to generate or send ticket email for ticket ID: " + savedTicket.getTicketId(), e);
            // Don't throw exception - ticket is already purchased, email failure shouldn't block the transaction
        }

        return PaymentResponse.fromTicket(savedTicket, emailSent, emailError);
    }

    /**
     * Generates PDF ticket and sends confirmation email
     */
    private void generateAndSendTicket(Ticket ticket, String ticketReference, String userName) throws Exception {
        TicketType ticketType = ticket.getTicketType();
        
        // Generate PDF
        byte[] ticketPdf = ticketPdfService.generateTicketPdf(
            ticket.getTicketCode(),
            ticketType.getEvent().getTitle(),
            ticketType.getEvent().getArtist(),
            ticketType.getEvent().getVenue(),
            ticketType.getEvent().getDate(),
            userName,
            ticket.getUserEmail(),
            ticketType.getName(),
            ticket.getQuantity(),
            ticket.getTotalPrice()
        );

        // Send email with attachment
        emailService.sendTicketConfirmationEmail(
                ticket.getUserEmail(),
                userName,
                ticketType.getEvent().getTitle(),
                ticket.getTicketCode(),
                ticketPdf,
                ticketReference
        );

        logger.info("Ticket confirmation email sent to: " + ticket.getUserEmail() + " for ticket: " + ticket.getTicketId());
    }
}
