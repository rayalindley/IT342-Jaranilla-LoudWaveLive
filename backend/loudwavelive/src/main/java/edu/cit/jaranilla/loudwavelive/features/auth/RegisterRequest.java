package edu.cit.jaranilla.loudwavelive.features.auth;
import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
}