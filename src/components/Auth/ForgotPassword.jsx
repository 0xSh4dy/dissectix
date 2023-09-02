import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Auth.css';



function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(`A password reset link has been sent to ${email}`);
  };

  return (
    <div className="center-container">
      
      <form onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <p className="Text-forgotPass">Enter your email address to reset your password.</p>
      {message && <p>{message}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Reset Password</button>
          <Link to="/login"><button type="button">Back to Login</button></Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;

