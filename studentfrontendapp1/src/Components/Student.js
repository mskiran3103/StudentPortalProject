import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [students, setStudents] = React.useState([])
    const [open, setOpen] = React.useState(false); // To control the pop-up
    const [nameError, setNameError] = React.useState('');
    const [addressError, setAddressError] = React.useState('');

    const handleClick = (e) => {
        e.preventDefault();

        // Reset any existing errors
        setNameError('');
        setAddressError('');

        // Validation checks
        let valid = true;
        if (name.trim() === '') {
            setNameError('Name is required');
            valid = false;
        }
        if (address.trim() === '') {
            setAddressError('Address is required');
            valid = false;
        }

        if (valid) {
            const student = { name, address };
            console.log(student);
            fetch("http://localhost:8080/student/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            }).then(() => {
                console.log("New Student Added");
                setOpen(true); // Open the pop-up after submission
            });
        }
    }

    React.useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            });
    }, []);

    const handleClose = () => {
        setOpen(false); // Close the pop-up when the user clicks the "OK" button
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Student</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Student Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Student Address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={!!addressError}
                        helperText={addressError}
                    />

                    <Button variant="outlined" onClick={handleClick}>Submit</Button>
                </Box>
            </Paper>
            <Paper elevation={3} style={paperStyle}>
                {
                    students.map(
                        student => (
                            <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
                                Id: {student.id} <br />
                                Name: {student.name} <br />
                                Address: {student.address}
                            </Paper>
                        ))
                }
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <p>New student added successfully!</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}