import { useDispatch, useSelector } from "react-redux"
import { selectChallenge, setChallenge } from "../../slices/challengeSlice";
import React, { useEffect, useState } from "react";
import { CHALLENGE_URL, CODE_SUBMISSION_URL, CODE_TESTING_URL } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { selectToken } from "../../slices/tokenSlice";
import { Editor } from "@monaco-editor/react";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Input, InputLabel, NativeSelect, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { selectEditorTheme, setEditorTheme } from "../../slices/editorThemeSlice";
import AssemblyCode from "./AssemblyCode";
import { selectFunction } from "../../slices/functionSlice";
import { selectCode, setCurrentCode } from "../../slices/codeSlice";
import { selectUser } from "../../slices/userSlice";

function getCodeAndFunctions(base64Code) {
    let decodedCode = JSON.parse(atob(base64Code));
    let functions = Object.keys(decodedCode);
    let code = {}
    for (let fun of functions) {
        code[fun] = decodedCode[fun];
    }
    return {code:code,functions:functions};
}
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
    const [mode, setMode] = useState("original"); // anyone of original, compiled, diffed
    const [originalCode, setOriginalCode] = useState({});
    const [currentOriginalFunction,setCurrentOriginalFunction] = useState([]);
    const [mangledNames, setMangledNames] = useState([]);
    const [currentCompiledFunction,setCurrentCompiledFunction] = useState([]);
    const [percentage,setPercentage] = useState(0);
    const username = useSelector(selectUser);
    const [bestPercentage,setBestPercentage] = useState(0);

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
            setFunctions(data.detail.functions.split("|"));
            let returnCode = getCodeAndFunctions(data.detail.code);
            setOriginalCode(returnCode.code);
            setMangledNames(returnCode.functions);
            setCurrentOriginalFunction(returnCode.functions[0]);
            let solve_data = data.detail.solve_percentage;
            console.log(solve_data)
            console.log(username)
            if(solve_data[username]){
                setBestPercentage(solve_data[username]);
            }
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
            name: challName,
            mangledFunctions: mangledNames
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
                setCurrentCompiledFunction(Object.keys(asmCode)[0]);
                setUserAsm(asmCode);
            }
        }
    }

    function OriginalCodeContainer(){
        return <React.Fragment>
            <FormControl>
                <NativeSelect onChange={(e)=>{setCurrentOriginalFunction(e.target.value);}}>
                    {mangledNames.map(x=><option value={x} key={x}>{x}</option>)}
                </NativeSelect>
            </FormControl>
            {originalCode[currentOriginalFunction]?<AssemblyCode code={originalCode[currentOriginalFunction].asm}/>:null}
        </React.Fragment>
    }

    function CompileMeMessage(){
        return <Typography color="red" marginTop={10} variant="h6">Please compile the code first</Typography>
    }
    function CompiledCodeContainer(){
        return <React.Fragment>
            <FormControl>
                <NativeSelect onChange={(e)=>setCurrentCompiledFunction(e.target.value)}>
                    {mangledNames.map(x=><option value={x} key={x}>{x}</option>)}
                </NativeSelect>
            </FormControl>
            {userAsm[currentCompiledFunction]?<AssemblyCode code={userAsm[currentCompiledFunction].asm}/>:<CompileMeMessage/>}
        </React.Fragment>
    }

    async function submitSolution(){
        let submissionData = {
            chall_id:challengeId,
            code:code
        };
        const response = await fetch(CODE_SUBMISSION_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Token ${token}`
            },
            body:JSON.stringify(submissionData)
        });
        if(response.status!=200){
            alert(response.statusText);
        }
        else{
            const responseData = await response.json();
            if(responseData.error){
                alert(responseData.detail);
            }
            else{
                let perc = parseInt(responseData.detail)
                setPercentage(perc);
                if(perc>bestPercentage){
                    setBestPercentage(perc)
                }
                setUserAsm(responseData.disasm)
            }
        }
    }

    return <Grid container marginTop="10px" sx={{ position: "relative", bottom: "10px" }}>
        <Grid item xs={2} padding={4}>
            <Typography color="blue" variant="h4">{challName}</Typography>
            <Typography  variant="h6">Best: {bestPercentage}%</Typography>
            <Typography marginBottom={2} variant="h6">Current: {percentage}%</Typography>
            <FormControl>
                <InputLabel variant="standard">Theme</InputLabel>
                <NativeSelect onChange={(e) => { dispatch(setEditorTheme(e.target.value)); }}>
                    <option value="vs-dark">Dark</option>
                    <option value="light">Light</option>
                </NativeSelect>
            </FormControl>
            <Button onClick={()=>{checkCode();localStorage.setItem(challengeId, code);}} fullWidth variant="contained" sx={{ marginTop: "1rem" }}>
                Compile
            </Button>

            <Button onClick={()=>{submitSolution();localStorage.setItem(challengeId, code);}} variant="contained" fullWidth sx={{marginTop:"1rem"}}>
                Submit
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
        <Grid item xs={5} columnSpacing={2} >
            <Grid item xs={12} sx={{ marginLeft: "2px" }}>
                <div>
                    <FormControl>
                        <FormLabel sx={{ textAlign: "center", marginTop: "5px" }}>Your Assembly!</FormLabel>
                        <RadioGroup defaultValue="original" row onChange={(e) => setMode(e.target.value)} >
                            <FormControlLabel value="original" control={<Radio />} label="Original" />
                            <FormControlLabel value="compiled" control={<Radio />} label="Compiled" />
                            {/* <FormControlLabel  value="diffed" control={<Radio />} label="Diffed"/> */}
                        </RadioGroup>
                    </FormControl>
                </div>
                {mode === "original" ? <OriginalCodeContainer/>: <CompiledCodeContainer/>};
            </Grid>


        </Grid>

    </Grid>
}