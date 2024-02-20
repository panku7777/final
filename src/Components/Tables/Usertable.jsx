// UsersTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './usertable.css'


function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your API endpoint
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/users');
        setUsers(response.data); // Assuming the response is an array of users
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchUsers();
  }, []); // Run this effect once when the component mounts

  return (
    <div>
      <h2>Users Table</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* Add more cells for additional columns */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
