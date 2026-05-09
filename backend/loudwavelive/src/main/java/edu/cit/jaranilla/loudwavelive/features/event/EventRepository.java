package edu.cit.jaranilla.loudwavelive.features.event;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    
}
