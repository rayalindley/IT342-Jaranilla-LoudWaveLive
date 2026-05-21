package edu.cit.jaranilla.loudwavelive.config;

import edu.cit.jaranilla.loudwavelive.features.auth.User;
import edu.cit.jaranilla.loudwavelive.features.auth.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        boolean adminExists = userRepository.findAll().stream()
                .anyMatch(user -> "ADMIN".equals(user.getRole()));

        if (!adminExists) {
            User admin = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@loudwavelive.com")
                    .password(passwordEncoder.encode("Admin123!"))
                    .role("ADMIN")
                    .build();

            userRepository.save(admin);
            System.out.println("Default admin account created: admin@loudwavelive.com / Admin123!");
        }
    }
}
