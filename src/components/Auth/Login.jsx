import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Auth.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', username, password);
  };

  return (
  
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="login">Login</button>
        <Link to="/forgotPassword"><button type="button">Forgot Password</button></Link>
        <Link to="/register"><button type="button">New User? Register</button></Link>
      </form>
    </div>
    
  );
}

export default LoginPage;

