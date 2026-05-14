package edu.cit.jaranilla.loudwavelive.features.event;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {
    private final EventService eventService;
    private final EventRepository eventRepository;

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/organizer/{organizerId}")
    public List<Event> getOrganizerEvents(@PathVariable Long organizerId) {
        return eventRepository.findByOrganizerOrganizerId(organizerId);
    }
}