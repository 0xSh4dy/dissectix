import { ListItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../slices/userSlice";

export default function LoggedInComponents() {
    const username = useSelector(selectUser);
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
            <Link to={`/profile/${username}`} className='navLink'>
                Profile
            </Link>
        </ListItem>
    </React.Fragment>
}