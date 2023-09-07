import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { selectToken } from '../../slices/tokenSlice';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, List, ListItem, Button } from '@mui/material';

function Navbar() {
  const token = useSelector(selectToken);

  return (
    <AppBar position="static" className="appBar">
      <Toolbar className="toolbar">
        <Link to="/" className="logo">
          Dissectix
        </Link>
        <List className="navList">
          <ListItem className="navItem">
            <Link to="/" className="navLink">
              Home
            </Link>
          </ListItem>
          <ListItem className="navItem">
            <Link to="/about" className="navLink">
              About
            </Link>
          </ListItem>
          <ListItem className="navItem">
            <Link to="/dashboard" className="navLink">
              Dashboard
            </Link>
          </ListItem>
          <ListItem className="navItem">
            <Link to="/createChallenge" className='navLink'>
              Create Challenge
            </Link>
          </ListItem>
          <ListItem className='navItem'>
            <Link to='/mychallenges' className='navLink'>
              My Challenges
            </Link>
          </ListItem>
          <ListItem className='navItem'>
            <Link to='/profile' className='navLink'>
              Profile
            </Link>
          </ListItem>
          <ListItem className="navItem" style={{ display: token ? 'none' : 'inline-block' }}>
            <Link to="/login" className="navLink">
              Login
            </Link>
          </ListItem>
          <ListItem className="navItem" style={{ display: token ? 'inline-block' : 'none' }}>
            <Link to="/logout" className="navLink">
              Logout
            </Link>
          </ListItem>
        </List>
        {token ? (
          <Button variant="outlined" className="logoutButton">
            Logout
          </Button>
        ) : (
          <Button variant="outlined" className="loginButton">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
