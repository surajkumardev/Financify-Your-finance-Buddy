package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Subscription;
import com.example.demo.model.User;
import com.example.demo.repository.SubscriptionRepository;
import com.example.demo.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public SubscriptionController(SubscriptionRepository subscriptionRepository, UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Subscription> list(Authentication authentication) {
        User user = requireUser(authentication);
        return subscriptionRepository.findByUserOrderByIdDesc(user);
    }

    @PostMapping
    public Subscription create(@RequestBody @Valid Subscription s, Authentication authentication) {
        User user = requireUser(authentication);
        System.out.println("[SubscriptionController] create called by " + user.getEmail() + ", payload name=" + s.getName() + ", amount=" + s.getAmount());
        s.setUser(user);
        return subscriptionRepository.save(s);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subscription> update(@PathVariable Long id, @RequestBody @Valid Subscription updated, Authentication authentication) {
        User user = requireUser(authentication);
        Optional<Subscription> existing = subscriptionRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) return ResponseEntity.notFound().build();
        Subscription s = existing.get();
        s.setName(updated.getName());
        s.setAmount(updated.getAmount());
        s.setRepeat(updated.getRepeat());
        s.setDate(updated.getDate());
        return ResponseEntity.ok(subscriptionRepository.save(s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication) {
        User user = requireUser(authentication);
        Optional<Subscription> existing = subscriptionRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) return ResponseEntity.notFound().build();
        subscriptionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private User requireUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow();
    }
}


