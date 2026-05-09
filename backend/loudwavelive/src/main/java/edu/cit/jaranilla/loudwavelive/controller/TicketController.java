package edu.cit.jaranilla.loudwavelive.controller;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import edu.cit.jaranilla.loudwavelive.service.TicketService;
import lombok.RequiredArgsConstructor;
import edu.cit.jaranilla.loudwavelive.entity.Ticket;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {
    private final TicketService ticketService;

    @GetMapping("/user/{userId}")
    public List<Ticket> getTickets(@PathVariable Long userId) {
        return ticketService.getUserTickets(userId);
    }
}