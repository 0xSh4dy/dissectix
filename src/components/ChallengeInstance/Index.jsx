import { useDispatch, useSelector } from "react-redux"
import { selectChallenge, setChallenge } from "../../slices/challengeSlice";
import { useEffect, useState } from "react";
import { CHALLENGE_URL, CODE_TESTING_URL } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { selectToken } from "../../slices/tokenSlice";
import { Editor } from "@monaco-editor/react";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, NativeSelect, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import AssemblyView from "./AssemblyView";
import { selectEditorTheme, setEditorTheme } from "../../slices/editorThemeSlice";
import AssemblyCode from "./AssemblyCode";
import { selectFunction } from "../../slices/functionSlice";
import { selectCode, setCurrentCode } from "../../slices/codeSlice";

export default function ChallengeInstance() {
    const [language, setLanguage] = useState("");
    const location = useLocation();
    const token = useSelector(selectToken);
    const editorTheme = useSelector(selectEditorTheme);
    const [code, setCode] = useState("// Type your code here");
    const [challName, setChallName] = useState("");
    const dispatch = useDispatch();
    const [challengeId, setChallengeId] = useState("");
    const [functions, setFunctions] = useState([]);
    const [userAsm, setUserAsm] = useState("");
    const curFnName = useSelector(selectFunction);

    useEffect(() => {
        let challFetchingUrl = CHALLENGE_URL + "?";
        const challId = location.pathname.split("/")[2];
        setChallengeId(challId);
        let savedCode = localStorage.getItem(challId);
        if (savedCode != "" || savedCode != null) {
            setCode(savedCode);
        }

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
            setFunctions(data.detail.functions);
        }).catch((err) => { console.log(err); return; });

    }, []);

    async function checkCode() {
        let url = CODE_TESTING_URL;
        if (code == "") {
            alert("Please enter some code");
            return;
        }
        let data = {
            code: code,
            language: language,
            functions: functions,
            function: curFnName,
            name: challName
        }
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (resp.status != 200) {
            alert(resp.statusText);
        }
        else {
            const stats = await resp.json();
            if (stats.error) {
                alert(stats.detail);
            }
            else {
                let asmCode = JSON.parse(stats.detail);
                console.log(asmCode)
                setUserAsm(asmCode);
            }
        }
    }
    return <Grid container marginTop="10px" sx={{ position: "relative", bottom: "10px" }}>
        <Grid item xs={2} padding={4}>
                <Typography variant="h4">{challName}</Typography>
                <FormControl>
                    <InputLabel variant="standard">Theme</InputLabel>
                    <NativeSelect onChange={(e) => { dispatch(setEditorTheme(e.target.value)); }}>
                        <option value="vs-dark">Dark</option>
                        <option value="light">Light</option>
                    </NativeSelect>
                </FormControl>
                <Button onClick={checkCode} fullWidth variant="contained" sx={{ marginTop: "1rem" }}>
                    Test
                </Button>
                <Button onClick={() => {
                    localStorage.setItem(challengeId, code)
                }} fullWidth variant="contained" sx={{ marginTop: "1rem" }}>
                    Save
                </Button>
        </Grid>
        <Grid item xs={5}>
            <Editor
                theme={editorTheme}
                height="100vh"
                language={language}
                defaultValue="// Type your code here"
                value={code}
                onChange={(value) => setCode(value)}
            />
        </Grid>
        <Grid container xs={5} columnSpacing={2} >
            <Grid item xs={12}>
                <AssemblyView />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <FormControl>
                        <FormLabel>Your Assembly!</FormLabel>
                        <RadioGroup row >
                            <FormControlLabel value="original" control={<Radio/>} label="Original"/>
                            <FormControlLabel  value="compiled" control={<Radio />} label="Compiled"/>
                            <FormControlLabel  value="diffed" control={<Radio />} label="Diffed"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <AssemblyCode code={userAsm.asm} />
            </Grid>

        </Grid>

    </Grid>
}