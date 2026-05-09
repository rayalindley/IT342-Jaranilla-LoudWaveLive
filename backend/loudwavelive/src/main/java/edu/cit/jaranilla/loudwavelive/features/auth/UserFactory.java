package edu.cit.jaranilla.loudwavelive.factory;
import edu.cit.jaranilla.loudwavelive.dto.RegisterRequest;
import edu.cit.jaranilla.loudwavelive.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User createUser(RegisterRequest request) {
        return User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(encoder.encode(request.getPassword()))
            .role(request.getRole())
            .build();
    }
}