package edu.cit.jaranilla.loudwavelive.controller;
import edu.cit.jaranilla.loudwavelive.dto.LoginRequest;
import edu.cit.jaranilla.loudwavelive.dto.RegisterRequest;
import edu.cit.jaranilla.loudwavelive.entity.User;
import edu.cit.jaranilla.loudwavelive.facade.AuthFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthFacade authFacade;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = authFacade.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return authFacade.loginUser(request);
    }
}