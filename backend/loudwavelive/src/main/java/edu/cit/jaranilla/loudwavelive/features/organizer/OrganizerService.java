package edu.cit.jaranilla.loudwavelive.features.organizer;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import edu.cit.jaranilla.loudwavelive.features.auth.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrganizerService {
    private final OrganizerRepository organizerRepository;
    private final UserRepository userRepository;

    public Organizer createOrganizer(Long userId, Organizer organizer) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found!"));

        user.setRole("ORGANIZER");
        userRepository.save(user);

        organizer.setUser(user);
        organizer.setVerificationStatus("APPROVED");
        organizer.setCreatedAt(LocalDateTime.now());

        return organizerRepository.save(organizer);
    }
}