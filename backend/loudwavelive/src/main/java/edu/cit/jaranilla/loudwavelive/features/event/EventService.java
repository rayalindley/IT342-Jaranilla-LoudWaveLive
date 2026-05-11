package edu.cit.jaranilla.loudwavelive.features.event;

import edu.cit.jaranilla.loudwavelive.features.ticket.TicketType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public Event createEvent(Event event) {
        if(event.getTicketTypes() != null) {
            for(TicketType ticketType : event.getTicketTypes()) {
                ticketType.setEvent(event);
                ticketType.setQuantitySold(0);
            }
        }

        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}