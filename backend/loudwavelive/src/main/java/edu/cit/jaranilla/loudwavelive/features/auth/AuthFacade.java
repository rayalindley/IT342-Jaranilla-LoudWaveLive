package edu.cit.jaranilla.loudwavelive.features.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthFacade {
    private final AuthService authService;

    public User registerUser(RegisterRequest request) {
        return authService.register(request);
    }

    public User loginUser(LoginRequest request) {
        return authService.login(request);
    }
}