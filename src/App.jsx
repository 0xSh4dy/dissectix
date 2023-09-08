
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import ChallengeForm from './components/ChallengeForm/Index';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import NavBar from "./components/Navbar/NavBar.jsx";
import Footer from './components/Footer/Footer.jsx';
import { Home } from '@mui/icons-material';
import Logout from "./components/Auth/Logout.jsx";
import Dashboard from './components/Dashboard/Index';
import ChallengeInstance from './components/ChallengeInstance/Index';
import { useSelector } from 'react-redux';
import { selectToken } from './slices/tokenSlice';
import Leaderboard from './components/Leaderboard/Index';
import Profile from './components/Profile/Index';
function App() {

  const token = useSelector(selectToken);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={token==""?<Login />:<Dashboard/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/createChallenge" element={token==""?<Login/>:<ChallengeForm />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/challenge/:challengeId' element={<ChallengeInstance/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>

  );

}


export default App;
