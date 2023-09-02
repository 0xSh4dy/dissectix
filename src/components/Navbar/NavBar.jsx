import React from 'react';
import { Link } from 'react-router-dom'; 
import './NavBar.css';
function Navbar() {
  return (
    <div className="navbar">
      <h1>Dissectix</h1>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/LogIn">LogIn</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

