import { useDispatch } from "react-redux";
import { setToken } from "../../slices/tokenSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(setToken(""));
        navigate("/login");
    },[])
    return <></>    
}