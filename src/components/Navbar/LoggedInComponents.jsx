import { ListItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function LoggedInComponents() {
    return <React.Fragment>
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
            <Link to='/profile' className='navLink'>
                Profile
            </Link>
        </ListItem>
    </React.Fragment>
}