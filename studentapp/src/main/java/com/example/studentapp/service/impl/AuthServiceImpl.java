package com.example.studentapp.service.impl;

import com.example.studentapp.dto.LoginDTO;
import com.example.studentapp.model.User;
import com.example.studentapp.repository.UserRepository;
import com.example.studentapp.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Ensure role format is correct (e.g. ROLE_USER or ROLE_ADMIN)
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");
        } else {
            String role = user.getRole().toUpperCase();
            if (!role.startsWith("ROLE_")) {
                user.setRole("ROLE_" + role);
            } else {
                user.setRole(role);
            }
        }
        
        return userRepository.save(user);
    }

    @Override
    public String login(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password!"));

        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return "Login Successful! Use HTTP Basic Auth with your credentials for further requests.";
        } else {
            throw new RuntimeException("Invalid username or password!");
        }
    }
}
