package edu.cit.jaranilla.loudwavelive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.cit.jaranilla.loudwavelive.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    
}
