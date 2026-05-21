package edu.cit.jaranilla.loudwavelive.features.event;

import edu.cit.jaranilla.loudwavelive.features.ticket.TicketType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CreateEventRequest {
    private String title;
    private String artist;
    private String description;
    private String venue;
    private LocalDateTime date;
    private String imageUrl;
    private Long organizerId;

    private List<TicketType> ticketTypes;
}