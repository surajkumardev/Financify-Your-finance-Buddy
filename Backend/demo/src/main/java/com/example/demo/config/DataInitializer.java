package com.example.demo.config;

import com.example.demo.model.Budget;
import com.example.demo.model.SavingGoal;
import com.example.demo.model.User;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.SavingGoalRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedDemoData(UserRepository users, BudgetRepository budgets, SavingGoalRepository goals, PasswordEncoder encoder) {
        return args -> {
            String email = "demo@financify.app";
            if (users.existsByEmail(email)) return;

            User u = new User();
            u.setName("Demo User");
            u.setEmail(email);
            u.setPasswordHash(encoder.encode("password123"));
            u = users.save(u);

            Budget b = new Budget();
            b.setUser(u);
            b.setMonth("2025-10");
            b.setIncome(80000.0);
            b.setExpenses(52000.0);
            budgets.save(b);

            SavingGoal g = new SavingGoal();
            g.setUser(u);
            g.setTitle("Car");
            g.setTargetAmount(600000.0);
            g.setSavedAmount(125000.0);
            goals.save(g);
        };
    }
}


