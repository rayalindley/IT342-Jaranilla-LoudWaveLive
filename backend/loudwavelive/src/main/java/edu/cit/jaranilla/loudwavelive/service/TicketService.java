package edu.cit.jaranilla.loudwavelive.service;
import java.util.List;
import org.springframework.stereotype.Service;
import edu.cit.jaranilla.loudwavelive.entity.Ticket;
import edu.cit.jaranilla.loudwavelive.repository.TicketRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;

    public List<Ticket> getUserTickets(Long userId) {
        return ticketRepository.findByUserId(userId);
    }
}
