import { useDispatch, useSelector } from "react-redux"
import { selectChallenge, setChallenge } from "../../slices/challengeSlice";
import { useEffect, useState } from "react";
import { CHALLENGE_URL } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { selectToken } from "../../slices/tokenSlice";
import { Editor } from "@monaco-editor/react";
import { Button, FormControl, Grid, InputLabel, NativeSelect, Typography } from "@mui/material";
import AssemblyView from "./AssemblyView";
import { selectEditorTheme, setEditorTheme } from "../../slices/editorThemeSlice";

export default function ChallengeInstance() {
    const [language,setLanguage] = useState("");    
    const location = useLocation();
    const token = useSelector(selectToken);
    const editorTheme = useSelector(selectEditorTheme);
    const [code,setCode] = useState("");
    const [challName,setChallName] = useState("");
    const dispatch = useDispatch();
    const [challengeId,setChallengeId] = useState("");

    useEffect(() => {
        let challFetchingUrl = CHALLENGE_URL + "?";
        const challId = location.pathname.split("/")[2];
        setChallengeId(challId);
        challFetchingUrl += new URLSearchParams({
            chall_id: challId
        });
        fetch(challFetchingUrl, {
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(response => response.json()).then((data) => {
            setLanguage(data.detail.language);
            setChallName(data.detail.name);
        }).catch((err) => { console.log(err); return; });

    }, []);

    function checkCode(){
        console.log(code);
    }
    return <Grid container marginTop="10px"  sx={{ position: "relative", bottom: "10px" }}>
        <Grid item xs={2} padding={2}>
            <Typography variant="h4">{challName}</Typography>
            <FormControl>
                <InputLabel variant="standard">Theme</InputLabel>
                <NativeSelect onChange={(e) => dispatch(setEditorTheme(e.target.value))}>
                    <option value="vs-dark">Dark</option>
                    <option value="light">Light</option>
                </NativeSelect>
            </FormControl>
            <Button onClick={()=>{checkCode()}} fullWidth variant="contained" sx={{marginTop:"1rem"}}>
                Test
            </Button>
            
        </Grid>
        <Grid item xs={6}>
            <Editor
                theme={editorTheme}
                height="90vh"
                language={language}
                defaultValue="// Type your code here"
                onChange={(value)=>{setCode(value)}}
            />
        </Grid>
        <Grid item xs={4}>
            <AssemblyView />
        </Grid>

    </Grid>
}