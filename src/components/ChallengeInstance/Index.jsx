import { useSelector } from "react-redux"
import { selectChallenge } from "../../slices/challengeSlice";
import { useEffect,useState } from "react";

export default function ChallengeInstance(){
    const challenge = useSelector(selectChallenge);
    const [challengeData,setChallengeData] = useState({});

    useEffect(()=>{
        if(challenge.chall_id==""){

        }
    },[])
    return <>
    </>
}