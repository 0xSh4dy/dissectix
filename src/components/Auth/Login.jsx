import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Auth.css';
import { LOGIN_URL } from '../../constants';
import { httpJsonPost } from '../../utils/httpHandler';
import { useDispatch } from 'react-redux';
import { setToken } from '../../slices/tokenSlice';
import { setUser } from '../../slices/userSlice';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      "username":username,
      "password":password
    }
    const response = await httpJsonPost(data,LOGIN_URL);
    if(response.status==404){
      alert("User not found");
    }
    else{
      let token = response.response.token;
      let message = response.response.detail;
      alert(message);
      dispatch(setToken(token));
      dispatch(setUser(username));
      navigate("/dashboard");
    }
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

