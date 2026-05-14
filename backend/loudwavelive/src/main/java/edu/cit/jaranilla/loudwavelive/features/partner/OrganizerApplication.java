package edu.cit.jaranilla.loudwavelive.features.partner;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "organizer_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizerApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;
    
    private String userId;
    private String fullName;
    private String companyName;
    private String organizationType;
    private String businessEmail;
    private String contactNumber;

    @Column(columnDefinition = "TEXT")
    private String experience;

    @Column(columnDefinition = "TEXT")
    private String reason;

    private String status;
}