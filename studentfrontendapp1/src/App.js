import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // Make sure to import Button
import Dialog from '@mui/material/Dialog'; // Import Dialog component
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddUser from "./Components/AddUser.js";
import GetUser from "./Components/GetUser.js";

function App() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [addedUserId, setAddedUserId] = useState(null); // Added user's ID

    const handleUserAdded = (userId) => {
        setAddedUserId(userId);
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setAddedUserId(null); // Reset added user's ID
        setShowConfirmation(false);
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Student</u></h1>
                <AddUser onUserAdded={handleUserAdded} />
            </Paper>
            <Paper elevation={3} style={paperStyle}>
                <GetUser />
            </Paper>
            {/* Confirmation Dialog */}
            {showConfirmation && (
                <Dialog
                    open={showConfirmation}
                    onClose={handleCloseConfirmation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
                    <DialogContent>
                        <p>New student added successfully with ID: {addedUserId}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmation} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
}

export default App;