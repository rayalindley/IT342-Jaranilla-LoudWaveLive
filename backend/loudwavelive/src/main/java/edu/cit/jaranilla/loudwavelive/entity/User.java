package edu.cit.jaranilla.loudwavelive.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue
    private UUID id;

    private String firstname;
    private String lastname;

    @Column(unique = true)
    private String email;

    private String password;

    private String role;
}