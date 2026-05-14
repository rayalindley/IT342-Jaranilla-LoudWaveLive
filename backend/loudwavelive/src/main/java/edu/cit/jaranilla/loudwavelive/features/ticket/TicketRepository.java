package edu.cit.jaranilla.loudwavelive.features.ticket;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUserUserId(Long userId);
}