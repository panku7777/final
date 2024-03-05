// Loginscreen.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './log.css';

function Adlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3005/api/admin/login', user);
      const userData = response.data;
      localStorage.setItem('AdminData', JSON.stringify(userData));
      navigate('/panel');
    } catch (err) {
      console.error(err);
      alert('Login Failed');
    }
  }

  return (
    <div className="login-body">
      <form className="container form">
        <h3>Sign In</h3>
        <input
          type="email"
          placeholder="Enter Email"
          className="text-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="text-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={Login}>
          Sign In
        </button>
        <br />
        
      </form>
    </div>
  );
}

export default Adlogin;
