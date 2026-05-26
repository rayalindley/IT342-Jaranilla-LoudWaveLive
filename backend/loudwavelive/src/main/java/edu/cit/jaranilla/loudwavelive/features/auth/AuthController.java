package edu.cit.jaranilla.loudwavelive.features.auth;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthFacade authFacade;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = authFacade.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return authFacade.loginUser(request);
    }

    @GetMapping("/admin-exists")
    public boolean adminExists() {
        return authFacade.adminExists();
    }

    @GetMapping("/user/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/google")
    public User googleLogin(@RequestBody GoogleAuthRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        
        if(existingUser.isPresent()) {
            return existingUser.get();
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password("")
                .role("ATTENDEE")
                .build();

        return userRepository.save(user);
    }
}