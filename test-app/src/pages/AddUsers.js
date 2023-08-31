import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './userDetails.css'; // Import your CSS file

function UserDetailsForm() {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !name || !address) {
            toast.error('Please fill out all fields.');
            return;
        }

        const userData = {
            userId: userId,
            name: name,
            address: address
        };

        try {
            const response = await fetch('http://localhost:8080/student/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                toast.success('ID is successfully added.');
                setUserId('');
                setName('');
                setAddress('');
            } else {
                toast.error('Failed to send user data');
            }
        } catch (error) {
            toast.error('Error sending user data: ' + error.message);
            
            // Display specific error message for server connection issues
            if (error.message.includes('Failed to fetch')) {
                toast.error('Server is not connected.');
            }
        }
    };

    return (
        <div className="user-details-container">
            <h2>Enter User Details</h2>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>User ID:</label>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
                    {!userId && <span className="error-message">Please enter User ID</span>}
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    {!name && <span className="error-message">Please enter Name</span>}
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {!address && <span className="error-message">Please enter Address</span>}
                </div>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserDetailsForm;
