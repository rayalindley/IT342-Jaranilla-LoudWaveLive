package edu.cit.jaranilla.loudwavelive.features.ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {
    @Query("SELECT t FROM TicketType t LEFT JOIN FETCH t.event WHERE t.ticketTypeId = :id")
    Optional<TicketType> findById(@Param("id") Long id);
}