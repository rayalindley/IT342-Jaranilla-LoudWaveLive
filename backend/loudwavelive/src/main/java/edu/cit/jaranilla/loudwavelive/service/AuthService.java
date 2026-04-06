package edu.cit.jaranilla.loudwavelive.service;
import edu.cit.jaranilla.loudwavelive.dto.LoginRequest;
import edu.cit.jaranilla.loudwavelive.dto.RegisterRequest;
import edu.cit.jaranilla.loudwavelive.entity.User;
import edu.cit.jaranilla.loudwavelive.factory.UserFactory;
import edu.cit.jaranilla.loudwavelive.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserFactory userFactory;

    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = userFactory.createUser(request);

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}