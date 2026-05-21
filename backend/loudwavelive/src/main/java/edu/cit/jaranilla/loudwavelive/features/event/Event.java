package edu.cit.jaranilla.loudwavelive.features.event;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import edu.cit.jaranilla.loudwavelive.features.organizer.Organizer;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    private String title;
    private String artist;
    private String venue;
    private LocalDateTime date;
    private String imageUrl;

    @Column(length = 2000)
    private String description;

    private String status;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<TicketType> ticketTypes;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private Organizer organizer;
}