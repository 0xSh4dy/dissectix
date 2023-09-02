
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import NavBar from "./components/Navbar/NavBar.jsx";
import Footer from './components/Footer/Footer.jsx';
function App() {

  return (
  <BrowserRouter>
  <NavBar />
  
  <Routes>
   <Route path="/" element={<Login/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/forgotPassword" element={<ForgotPassword/>}/>
   </Routes>
   <Footer/>
  </BrowserRouter>
 
  );

}


export default App;
