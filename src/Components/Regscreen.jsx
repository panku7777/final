// Registration.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Registration.css';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleRegistration(e) {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3005/api/users/register', newUser);
      const result = response.data;
      alert('Registration successful. Please log in.');
      navigate('/login'); // Redirect to the login page after successful registration
    } catch (error) {
      console.error(error);
      alert('Registration Failed');
    }
  }

  return (
    <div className="registration-body">
      <form className="container form" onSubmit={handleRegistration}>
        <h3>Register</h3>
        <input
          type="text"
          placeholder="Enter Name"
          className="text-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter Email"
          className="text-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="text-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button">
          Register
        </button>
        <br />
        <p className="typography">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;
