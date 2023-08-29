package com.example.studentPortal.Controller;

import com.example.studentPortal.Service.studentService;
import com.example.studentPortal.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class studentController {

    @Autowired
    private studentService studentservice;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Student student) {
        try {
            studentservice.saveStudent(student);
            return ResponseEntity.status(HttpStatus.CREATED).body("New Student is added");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add student");
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getAllStudents() {
        try {
            List<Student> studentList = studentservice.getAllStudents();
            return ResponseEntity.ok(studentList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}