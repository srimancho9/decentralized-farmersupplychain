// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic here, for now, just navigating to the main page
    if (username=="admin" && password=="pass123") {
      alert('Authenticated successfully!');
      navigate('/buyer'); // Redirect to main page or dashboard
    } else {
      alert('wrong credentials ');
    }
  };

  return (
    <div className="login-container">
      <h2>Buyer Authentication</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Submit</button>
      </form>
    </div>
  );
}

export default AuthPage;
