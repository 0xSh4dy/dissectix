import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Auth.css';

function RegistrationForm() {
  const [userData, setUserData] = useState({ username: "", password: "", email: "" });
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

   
  
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', userData.username, userData.email, userData.password);
  };
  
  function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            setEmailError(true);
            setSubmitDisabled(true);
        }
        else {
            setEmailError(false);
            validateData();
        }
    }
    
    
   async function submitData() {
        console.log(userData);
        if (userData.username.length === 0) {
            setUsernameError("Username cannot be empty");
            
        }
        if (userData.email.length === 0) {
            setEmailError("Email cannot be empty");
        }
        if (userData.password.length === 0) {
            setPasswordError("Password cannot be empty");
        }
    }
 

  return (
    <div className="register-container">

      <form className="register-form" >
        <h1>Register</h1>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={(e) => {
            setUserData({ username: e.target.value, password: userData.password, email: userData.email });
            submitData();
            }}
          />
          <span className="error-message">{usernameError}</span>
        </div>
        <div className="input-container">
       <label htmlFor="email">Email</label>
       <input
       type="email"
       id="email"
       value={userData.email}
       onChange={(e) => {
            setUserData({ username: userData.username, email: e.target.value, password: userData.password });
           validateEmail(); submitData(); 
       }}
         />
            <span className="error-message">{emailError}</span>
        </div>

        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
           
            value={userData.password}
            onChange={(e) => {setUserData({ username: userData.username, email: userData.email, password: e.target.value });
            submitData();
          }}
          />
        </div>
        <span className="error-message">{passwordError}</span>
        <button type="register" onClick={submitData} disabled={userData.username === '' || userData.email === '' || userData.password === ''}>Register</button>
        <Link to="/login"><button type="button">Back to Login</button></Link>
      </form>
    </div>
  );
}

export default RegistrationForm;

