import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Auth.css';
import {REGISTER_URL} from "../../constants";
import { httpJsonPost } from '../../utils/httpHandler';
import { useDispatch } from 'react-redux';
import { setToken } from '../../slices/tokenSlice';
import { setUser } from '../../slices/userSlice';

function RegistrationForm() {
  const [userData, setUserData] = useState({ username: "", password: "", email: "" });
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            setEmailError(true);
            setSubmitDisabled(true);
        }
        else {
            setEmailError(false);
        }
    }
    
    
   async function submitData() {
        if (userData.username.length === 0) {
            setUsernameError("Username cannot be empty");
        }
        if (userData.email.length === 0) {
            setEmailError("Email cannot be empty");
        }
        if (userData.password.length === 0) {
            setPasswordError("Password cannot be empty");
        }
        else{
          const response = await httpJsonPost(userData,REGISTER_URL);
          if(response.status!=200){
            let errors = response.response.errors;
            let keys = "";
            for(let key of Object.keys(errors)){
              keys = key;
              break;
            }
            alert(errors[keys]);
          }
          else{
            alert("Registration complete!");
            // dispatch(setToken(response.response.token));
            // dispatch(setUser(userData.username));
            navigate("/login");
          }
        }
    }
 

  return (
    <div className="register-container">

      <div className="register-form" >
        <h1>Register</h1>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={(e) => {
            setUserData({ username: e.target.value, password: userData.password, email: userData.email });
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
           validateEmail(); 
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
          }}
          />
        </div>
        <span className="error-message">{passwordError}</span>
        <button type="register" onClick={submitData} disabled={userData.username === '' || userData.email === '' || userData.password === ''}>Register</button>
        <Link to="/login"><button type="button">Back to Login</button></Link>
      </div>
    </div>
  );
}

export default RegistrationForm;

