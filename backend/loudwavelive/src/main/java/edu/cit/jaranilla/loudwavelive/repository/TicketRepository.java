package edu.cit.jaranilla.loudwavelive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.cit.jaranilla.loudwavelive.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
}
