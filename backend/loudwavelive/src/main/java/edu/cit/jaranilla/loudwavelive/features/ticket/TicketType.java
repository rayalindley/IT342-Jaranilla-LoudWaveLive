package edu.cit.jaranilla.loudwavelive.features.ticket;

import com.fasterxml.jackson.annotation.JsonBackReference;
import edu.cit.jaranilla.loudwavelive.features.event.Event;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketTypeId;

    private String name;
    private Double price;
    private Integer quantityAvailable;
    private Integer quantitySold;

    @ManyToOne
    @JoinColumn(name = "event_id")
    @JsonBackReference
    private Event event;
}