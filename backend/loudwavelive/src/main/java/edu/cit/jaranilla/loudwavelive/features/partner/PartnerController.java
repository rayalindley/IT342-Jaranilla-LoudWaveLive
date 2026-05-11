package edu.cit.jaranilla.loudwavelive.features.partner;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/partner")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PartnerController {
    private final OrganizerApplicationRepository organizerApplicationRepository;

    @PostMapping("/apply")
    public OrganizerApplication apply(@RequestBody OrganizerApplication application) {
        if(application.getStatus() == null) {
            application.setStatus("PENDING");
        }

        return organizerApplicationRepository.save(application);
    }
}
