package com.example.studentPortal.Service;

import com.example.studentPortal.Repository.studentRepo;
import com.example.studentPortal.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class studentServiceImp implements studentService{

    @Autowired
    private studentRepo studentrepo;
    @Override
    public Student saveStudent(Student student) {
        return studentrepo.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentrepo.findAll();
    }
}
