package edu.cit.jaranilla.loudwavelive.features.event;

import java.time.LocalDateTime;
import java.util.List;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketTypeRequest;
import lombok.Data;

@Data
public class EventRequest {
    private String title;
    private String venue;
    private LocalDateTime eventDate;
    private String imageUrl;
    private String description;
    private String status;

    private List<TicketTypeRequest> ticketTypes;
}