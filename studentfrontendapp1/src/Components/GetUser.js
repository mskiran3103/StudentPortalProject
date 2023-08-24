import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';

function GetUser() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then(result => {
                setStudents(result);
            });
    }, []);

    return (
        <Paper elevation={3}>
            {students.map(student => (
                <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
                    Id: {student.id} <br />
                    Name: {student.name} <br />
                    Address: {student.address}
                </Paper>
            ))}
        </Paper>
    );
}

export default GetUser;