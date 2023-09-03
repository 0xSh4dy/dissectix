import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { selectToken } from '../../slices/tokenSlice';
import { useSelector } from 'react-redux';
import { ListItem } from '@mui/material';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = useSelector(selectToken);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const loggedInStyle = token==""?{"display":"inline-block"}:{"display":"none"};
  const loggedOutStyle = token==""?{"display":"none"}:{"display":"inline-block"};

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
          <Link to="/dashboard" onClick={toggleMenu}>
            Dashboard
          </Link>
        </li>

        <ListItem className='nav-item' sx={loggedInStyle}>
        <Link to="/LogIn" onClick={toggleMenu}>
            LogIn
          </Link>
        </ListItem>
        <ListItem className='nav-item' sx={loggedOutStyle}>
        <Link to="/logout" onClick={toggleMenu}>
            Logout
          </Link>
        </ListItem>
      </ul>
    </nav>
  );
}

export default Navbar;
