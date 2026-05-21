package edu.cit.jaranilla.loudwavelive.features.partner;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import edu.cit.jaranilla.loudwavelive.features.auth.UserRepository;
import edu.cit.jaranilla.loudwavelive.features.organizer.Organizer;
import edu.cit.jaranilla.loudwavelive.features.organizer.OrganizerRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/partner")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PartnerController {
    private final OrganizerApplicationRepository organizerApplicationRepository;
    private final UserRepository userRepository;
    private final OrganizerRepository organizerRepository;

    @PostMapping("/apply")
    public OrganizerApplication apply(@RequestBody OrganizerApplication application) {
        if(application.getStatus() == null) {
            application.setStatus("PENDING");
        }

        return organizerApplicationRepository.save(application);
    }

    @GetMapping("/applications")
    public List<OrganizerApplication> getApplications() {
        return organizerApplicationRepository.findAll();
    }

    @PostMapping("/applications/{applicationId}/approve")
    public OrganizerApplication approveApplication(@PathVariable Long applicationId) {
        OrganizerApplication application = organizerApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus("APPROVED");
        OrganizerApplication savedApplication = organizerApplicationRepository.save(application);

        Long userId;
        try {
            userId = Long.valueOf(application.getUserId());
        } catch (NumberFormatException ex) {
            throw new RuntimeException("Invalid user id in application");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"ORGANIZER".equals(user.getRole())) {
            user.setRole("ORGANIZER");
            userRepository.save(user);
        }

        organizerRepository.findByUser(user)
                .orElseGet(() -> organizerRepository.save(
                        Organizer.builder()
                                .user(user)
                                .organizationName(application.getCompanyName())
                                .createdAt(LocalDateTime.now())
                                .build()
                ));

        return savedApplication;
    }
}
