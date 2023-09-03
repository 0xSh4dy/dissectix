import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <h1 className="dissectix">Dissectix</h1>
      <div className="menuButton" onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>
      <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" onClick={toggleMenu}>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/LogIn" onClick={toggleMenu}>
            LogIn
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
