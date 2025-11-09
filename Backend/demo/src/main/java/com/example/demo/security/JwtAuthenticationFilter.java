package com.example.demo.security;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            System.out.println("[JwtAuthFilter] Authorization header present. token=" + (token != null ? (token.length()>20? token.substring(0,20)+"...": token) : "null"));
            try {
                Claims claims = jwtUtil.parseClaims(token);
                String email = claims.getSubject();
                Optional<User> optionalUser = userRepository.findByEmail(email);
                if (optionalUser.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null) {
                    User user = optionalUser.get();
                    UserDetails userDetails = org.springframework.security.core.userdetails.User
                            .withUsername(user.getEmail())
                            .password(user.getPasswordHash())
                            .authorities(Collections.emptyList())
                            .build();

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("[JwtAuthFilter] Authentication set for user=" + user.getEmail());
                } else {
                    System.out.println("[JwtAuthFilter] No user found for token or authentication already set.");
                }
            } catch (Exception ex) {
                System.out.println("[JwtAuthFilter] Token parse error: " + ex.getMessage());
            }
        } else {
            System.out.println("[JwtAuthFilter] No Authorization header or not Bearer");
        }
        filterChain.doFilter(request, response);
    }
}


