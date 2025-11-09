package com.example.demo.controller;

import com.example.demo.model.SavingGoal;
import com.example.demo.model.User;
import com.example.demo.repository.SavingGoalRepository;
import com.example.demo.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
public class SavingGoalController {

    private final SavingGoalRepository savingGoalRepository;
    private final UserRepository userRepository;

    public SavingGoalController(SavingGoalRepository savingGoalRepository, UserRepository userRepository) {
        this.savingGoalRepository = savingGoalRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<SavingGoal> list(Authentication authentication) {
        User user = requireUser(authentication);
        return savingGoalRepository.findByUser(user);
    }

    @PostMapping
    public SavingGoal create(@RequestBody @Valid SavingGoal goal, Authentication authentication) {
        User user = requireUser(authentication);
        goal.setUser(user);
        return savingGoalRepository.save(goal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SavingGoal> update(@PathVariable Long id, @RequestBody @Valid SavingGoal updated, Authentication authentication) {
        User user = requireUser(authentication);
        Optional<SavingGoal> existing = savingGoalRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) {
            return ResponseEntity.notFound().build();
        }
        SavingGoal g = existing.get();
        g.setTitle(updated.getTitle());
        g.setTargetAmount(updated.getTargetAmount());
        g.setSavedAmount(updated.getSavedAmount());
        return ResponseEntity.ok(savingGoalRepository.save(g));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication) {
        User user = requireUser(authentication);
        Optional<SavingGoal> existing = savingGoalRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) {
            return ResponseEntity.notFound().build();
        }
        savingGoalRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/add")
    public ResponseEntity<SavingGoal> addFunds(@PathVariable Long id, @RequestParam("amount") Double amount, Authentication authentication) {
        if (amount == null || amount < 0) return ResponseEntity.badRequest().build();
        User user = requireUser(authentication);
        Optional<SavingGoal> existing = savingGoalRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) return ResponseEntity.notFound().build();
        SavingGoal g = existing.get();
        g.setSavedAmount((g.getSavedAmount() == null ? 0.0 : g.getSavedAmount()) + amount);
        return ResponseEntity.ok(savingGoalRepository.save(g));
    }

    private User requireUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow();
    }
}


