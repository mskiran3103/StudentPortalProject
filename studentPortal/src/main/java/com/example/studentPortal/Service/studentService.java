package com.example.studentPortal.Service;

import com.example.studentPortal.model.Student;

import java.util.List;

public interface studentService {
    public Student saveStudent(Student student); //This is to create students table
    public List<Student> getAllStudents(); // This is tp read the data from the table

}
