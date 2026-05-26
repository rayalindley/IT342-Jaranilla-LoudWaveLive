package edu.cit.jaranilla.loudwavelive.features.auth;

import lombok.Data;

@Data
public class GoogleAuthRequest {
    private String firstName;
    private String lastName;
    private String email;
}
