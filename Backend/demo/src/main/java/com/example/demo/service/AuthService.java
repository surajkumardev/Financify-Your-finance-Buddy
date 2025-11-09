package com.example.demo.service;

import com.example.demo.dto.AuthResponse;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthService(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse login(String email, String password) {
        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty() || !userService.matchesPassword(userOpt.get(), password)) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        User user = userOpt.get();
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        String token = jwtUtil.generateToken(user.getEmail(), claims);
        return new AuthResponse(token, user.getName(), user.getEmail());
    }
}


