package edu.cit.jaranilla.loudwavelive.facade;

import edu.cit.jaranilla.loudwavelive.dto.LoginRequest;
import edu.cit.jaranilla.loudwavelive.dto.RegisterRequest;
import edu.cit.jaranilla.loudwavelive.entity.User;
import edu.cit.jaranilla.loudwavelive.service.AuthService;
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