package com.example.studentapp.service;

import com.example.studentapp.dto.LoginDTO;
import com.example.studentapp.model.User;

public interface AuthService {
    User register(User user);
    String login(LoginDTO loginDTO);
}
