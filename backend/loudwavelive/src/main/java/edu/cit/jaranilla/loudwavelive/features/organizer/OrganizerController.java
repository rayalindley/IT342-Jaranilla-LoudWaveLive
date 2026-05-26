package edu.cit.jaranilla.loudwavelive.features.organizer;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import edu.cit.jaranilla.loudwavelive.features.auth.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/organizers")
@RequiredArgsConstructor
@CrossOrigin
public class OrganizerController {

    private final OrganizerRepository organizerRepository;
    private final UserRepository userRepository;

    @PostMapping("/approve/{userId}")
    public Organizer approveOrganizer(
            @PathVariable Long userId
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        user.setRole("ORGANIZER");

        userRepository.save(user);

        Organizer organizer = Organizer.builder()
                .user(user)
                .organizationName(
                        user.getFirstName()
                        + "'s Events"
                )
                .createdAt(LocalDateTime.now())
                .build();

        return organizerRepository.save(organizer);
    }

    @GetMapping("/user/{userId}")
    public Organizer getOrganizerByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return organizerRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Organizer profile not found"));
    }

        @GetMapping
        public List<Organizer> getAllOrganizers() {
                return organizerRepository.findAll();
        }
}
