package edu.cit.jaranilla.loudwavelive.features.organizer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/organizers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrganizerController {

    private final OrganizerService organizerService;

    @PostMapping("/create/{userId}")
    public Organizer createOrganizer(@PathVariable Long userId, @RequestBody Organizer organizer) {
        return organizerService.createOrganizer(userId, organizer);
    }
}