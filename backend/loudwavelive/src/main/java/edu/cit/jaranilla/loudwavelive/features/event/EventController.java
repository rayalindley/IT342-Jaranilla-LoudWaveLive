package edu.cit.jaranilla.loudwavelive.features.event;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import edu.cit.jaranilla.loudwavelive.features.organizer.Organizer;
import edu.cit.jaranilla.loudwavelive.features.organizer.OrganizerRepository;
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketType; 
import edu.cit.jaranilla.loudwavelive.features.ticket.TicketTypeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {
    private final EventService eventService;
    private final EventRepository eventRepository;
    private final OrganizerRepository organizerRepository;
    private final TicketTypeRepository ticketTypeRepository;


    @PostMapping
    public Event createEvent(@RequestBody CreateEventRequest request) {
        Organizer organizer = organizerRepository.findById(request.getOrganizerId())
            .orElseThrow();

        Event event = Event.builder()
            .title(request.getTitle())
            .artist(request.getArtist())
            .description(request.getDescription())
            .venue(request.getVenue())
            .date(request.getDate())
            .imageUrl(request.getImageUrl())
            .status("PENDING")
            .organizer(organizer)
            .build();

        List<TicketType> ticketTypes = request.getTicketTypes().stream()
            .map(ticket -> {
                TicketType ticketType =
                        TicketType.builder()
                                .name(ticket.getName())
                                .price(ticket.getPrice())
                                .quantityAvailable(
                                        ticket.getQuantityAvailable()
                                )
                                .quantitySold(0)
                                .event(event)
                                .build();

                return ticketType;
            })
            .toList();

        event.setTicketTypes(ticketTypes);

        return eventRepository.save(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findByStatus("APPROVED");
    }

    @GetMapping("/organizer/{organizerId}")
    public List<Event> getOrganizerEvents(@PathVariable Long organizerId) {
        return eventRepository.findByOrganizerOrganizerId(organizerId);
    }
}