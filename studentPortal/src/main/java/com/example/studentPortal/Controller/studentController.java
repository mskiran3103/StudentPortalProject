package com.example.studentPortal.Controller;

import com.example.studentPortal.Service.studentService;
import com.example.studentPortal.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class studentController {

    //Control Http methods like GET,POST,etc..
    @Autowired
    private studentService studentservice;


    @PostMapping("/add")
    public String add(@RequestBody Student student)
    {
        studentservice.saveStudent(student);
        return "New Student is added";
    }

    @GetMapping("/getAll")
    public List<Student> getAllStudents()
    {
        return studentservice.getAllStudents();
    }
}
