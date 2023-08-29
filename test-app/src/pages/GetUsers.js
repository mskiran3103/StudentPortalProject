import React, { useState, useEffect } from 'react';
import './userDetails.css'; // Import your CSS file

function UserDetailsTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/student/getAll');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="user-details-table">
            <h2>User Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserDetailsTable;
