package edu.cit.jaranilla.loudwavelive.features.ticket;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query("SELECT t FROM Ticket t JOIN FETCH t.ticketType tt JOIN FETCH tt.event WHERE t.user.userId = :userId")
    List<Ticket> findByUserUserId(@Param("userId") Long userId);
}