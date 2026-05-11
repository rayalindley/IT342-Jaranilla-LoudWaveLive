package edu.cit.jaranilla.loudwavelive.features.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final TicketRepository ticketRepository;

    @GetMapping("/user/{userId}")
    public List<Ticket> getUserTickets(@PathVariable String userId) {
        return ticketRepository.findByUserId(userId);
    }
}