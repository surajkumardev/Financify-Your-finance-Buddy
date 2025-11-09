package com.example.demo.controller;

import com.example.demo.model.Budget;
import com.example.demo.model.User;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetController(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Budget> list(Authentication authentication) {
        User user = requireUser(authentication);
        return budgetRepository.findByUser(user);
    }

    @PostMapping
    public Budget create(@RequestBody @Valid Budget budget, Authentication authentication) {
        User user = requireUser(authentication);
        budget.setUser(user);
        return budgetRepository.save(budget);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> update(@PathVariable Long id, @RequestBody @Valid Budget updated, Authentication authentication) {
        User user = requireUser(authentication);
        Optional<Budget> existing = budgetRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) {
            return ResponseEntity.notFound().build();
        }
        Budget b = existing.get();
        b.setMonth(updated.getMonth());
        b.setIncome(updated.getIncome());
        b.setExpenses(updated.getExpenses());
        return ResponseEntity.ok(budgetRepository.save(b));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication) {
        User user = requireUser(authentication);
        Optional<Budget> existing = budgetRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) {
            return ResponseEntity.notFound().build();
        }
        budgetRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private User requireUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow();
    }
}


