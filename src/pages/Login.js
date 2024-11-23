// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={() => navigate('/auth')} className="login-button">Login as Warehouse</button>
      <button onClick={() => navigate('/authb')} className="login-button">Login as Buyer</button>
    </div>
  );
}

export default Login;
