package edu.cit.jaranilla.loudwavelive.features.ticket;
import java.time.LocalDateTime;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String userEmail;
    private Integer quantity;
    private LocalDateTime purchasedAt;

    @ManyToOne
    @JoinColumn(name = "ticket_type_id")
    private TicketType ticketType;

    private Double totalPrice;
    private String paymentStatus;
    private String ticketCode;
}