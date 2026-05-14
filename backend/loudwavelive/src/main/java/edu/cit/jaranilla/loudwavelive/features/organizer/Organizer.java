package edu.cit.jaranilla.loudwavelive.features.organizer;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "organizers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Organizer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long organizerId;

    private String organizationName;

    @Column(length = 2000)
    private String description;

    private String logoUrl;
    private String website;
    private String facebook;
    private String instagram;
    private String verificationStatus;
    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}