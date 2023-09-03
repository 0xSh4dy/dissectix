import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../slices/tokenSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    useEffect(()=>{
        if(token==""){
            navigate("/login");
        }
    },[])
    return <React.Fragment>
    </React.Fragment>
}