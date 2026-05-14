package edu.cit.jaranilla.loudwavelive.features.ticket;
import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;

    public List<Ticket> getUserTickets(Long userId) {
        return ticketRepository.findByUserUserId(userId);
    }
}
