package com.example.studentapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WebController {

    @GetMapping("/")
    public String home() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public ModelAndView login(@RequestParam(value = "error", required = false) String error,
                             @RequestParam(value = "logout", required = false) String logout) {
        ModelAndView modelAndView = new ModelAndView();
        if (error != null) {
            modelAndView.addObject("error", "Invalid credentials provided");
        }
        if (logout != null) {
            modelAndView.addObject("message", "You have been logged out successfully");
        }
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("/students")
    public String students() {
        return "students";
    }

    @GetMapping("/add-student")
    public String addStudent() {
        return "add-student";
    }

    @GetMapping("/edit-student")
    public ModelAndView editStudent(@RequestParam("id") Long id) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("studentId", id);
        modelAndView.setViewName("edit-student");
        return modelAndView;
    }
}
