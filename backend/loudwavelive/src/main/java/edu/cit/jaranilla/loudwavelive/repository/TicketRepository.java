package edu.cit.jaranilla.loudwavelive.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import edu.cit.jaranilla.loudwavelive.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUserId(Long userId);
}
