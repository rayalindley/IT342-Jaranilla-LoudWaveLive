package edu.cit.jaranilla.loudwavelive.features.ticket;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;

    @PostMapping("/buy")
    public Ticket buyTicket(@RequestBody Ticket ticket) {
        ticket.setPurchasedAt(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
}
