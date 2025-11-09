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

import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionController(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Transaction> list(Authentication authentication) {
        User user = requireUser(authentication);
        return transactionRepository.findByUserOrderByIdDesc(user);
    }

    @PostMapping
    public Transaction create(@RequestBody @Valid Transaction tx, Authentication authentication) {
        User user = requireUser(authentication);
        System.out.println("[TransactionController] create called by " + user.getEmail() + ", payload name=" + tx.getName() + ", amount=" + tx.getAmount());
        tx.setUser(user);
        return transactionRepository.save(tx);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(@PathVariable Long id, @RequestBody @Valid Transaction updated, Authentication authentication) {
        User user = requireUser(authentication);
        Optional<Transaction> existing = transactionRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) return ResponseEntity.notFound().build();
        Transaction t = existing.get();
        t.setName(updated.getName());
        t.setAmount(updated.getAmount());
        t.setCategory(updated.getCategory());
        t.setMode(updated.getMode());
        t.setDate(updated.getDate());
        return ResponseEntity.ok(transactionRepository.save(t));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication) {
        User user = requireUser(authentication);
        Optional<Transaction> existing = transactionRepository.findById(id);
        if (existing.isEmpty() || !existing.get().getUser().getId().equals(user.getId())) return ResponseEntity.notFound().build();
        transactionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private User requireUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow();
    }
}


