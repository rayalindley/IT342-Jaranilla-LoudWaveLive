package edu.cit.jaranilla.loudwavelive.features.organizer;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizerRepository extends JpaRepository<Organizer, Long> {
    Optional<Organizer> findByUser(User user);
}