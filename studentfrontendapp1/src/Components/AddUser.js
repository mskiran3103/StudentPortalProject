import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddUser({ onUserAdded }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [addedUserId, setAddedUserId] = useState(null); // Track added user's ID

    const handleClick = () => {
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
            fetch("http://localhost:8080/student/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            }).then(response => response.json())
              .then(data => {
                console.log("New Student Added");
                setAddedUserId(data.id); // Store the added user's ID
                onUserAdded(data.id); // Notify parent component with ID
            });
        }
    };

    return (
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
            {addedUserId && <p>User added successfully with ID: {addedUserId}</p>}
        </Box>
    );
}

export default AddUser;
