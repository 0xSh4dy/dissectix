import React, { useEffect,useState } from "react";
import { PROFILE_URL } from "../../constants";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Profile(){
    const location = useLocation();
    const [profileData,setProfileData] = useState({});
    const [userName,setUserName] = useState("");

    useEffect(()=>{
        let username = location.pathname.split("/")[2];
        setUserName(username);
        fetch(PROFILE_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username:username})
        }).then(resp=>resp.json()).then((data)=>{
            console.log(data);
        }).catch(err=>alert(err));
    },[]);
    return <React.Fragment>
        <Typography>{username}</Typography>
    </React.Fragment>
}