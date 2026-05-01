package com.example.studentapp.service;

import com.example.studentapp.dto.StudentDTO;
import com.example.studentapp.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    Student addStudent(StudentDTO studentDTO);
    Student updateStudent(Long id, StudentDTO studentDTO);
    void deleteStudent(Long id);
    Page<Student> getAllStudents(Pageable pageable);
    Student getStudentById(Long id);
    Page<Student> searchStudents(String name, Pageable pageable);
}
