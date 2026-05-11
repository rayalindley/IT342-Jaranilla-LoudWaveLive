package edu.cit.jaranilla.loudwavelive.features.ticket;

import com.fasterxml.jackson.annotation.JsonIgnore;

import edu.cit.jaranilla.loudwavelive.features.event.Event;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TicketType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Integer quantityAvailable;
    private Integer quantitySold;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}