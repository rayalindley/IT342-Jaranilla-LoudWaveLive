package edu.cit.jaranilla.loudwavelive.features.event;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByOrganizerOrganizerId(Long organizerId);
}
