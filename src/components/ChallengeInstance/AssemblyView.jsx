import { PersonPinSharp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFunction, setFunction } from "../../slices/functionSlice";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import AssemblyCode from "./AssemblyCode";
import { CHALLENGE_URL } from "../../constants";
import { selectToken } from "../../slices/tokenSlice";


function decodeAsm(base64EncodedCode) {
    let decoded = JSON.parse(atob(base64EncodedCode));
    let functions = Object.keys(decoded);
    let data = {};

    for (let fn of functions) {
        let functionCode = decoded[fn]
        data[fn] = functionCode["asm"];
    }
    return { "functions": functions, "data": data };
}

export default function AssemblyView() {
    const token = useSelector(selectToken);
    const [functions, setFunctions] = useState([]);
    const [code, setCode] = useState({});
    const [fn, setCurrentFn] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        let challFetchingUrl = CHALLENGE_URL + "?";
        const challId = location.pathname.split("/")[2];

        challFetchingUrl += new URLSearchParams({
            chall_id: challId
        });
        fetch(challFetchingUrl, {
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(response => response.json()).then((data) => {
            let requiredData = {
                "chall_id": data.detail.chall_id,
                "code": data.detail.code,
                "name": data.detail.name,
                "functions": data.detail.functions,
                "language": data.detail.language
            };
            let programData = decodeAsm(requiredData.code);
            setFunctions(programData.functions);
            setCode(programData.data);
            dispatch(setFunction(programData.functions[0]));
        }).catch((err) => { console.log(err); return; });

    }, [])

    return <React.Fragment>
        <FormControl>
            <NativeSelect
                value={fn}
                onChange={(e) => {
                    setCurrentFn(e.target.value);
                    dispatch(setFunction(e.target.value));
                }}
            >
                {functions.map((fnName) => (
                    <option key={fnName} value={fnName}>
                        {fnName}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
        {
            functions != [] ?
                fn == "" ? <AssemblyCode code={code[functions[0]]}/> : <AssemblyCode code={code[fn]}/>
                : null
        }
    </React.Fragment>
}