import { createSlice } from "@reduxjs/toolkit";

export const challengeSlice = createSlice({
    name:"challenge",
    initialState:{
        challenge:{
            "chall_id":"",
            "code":"",
            "name":"",
            "functions":"",
            "language":""
        }
    },
    reducers:{
        setChallenge:(state,action)=>{
            state.challenge = action.payload;
        }
    }
});

export default challengeSlice.reducer;
export const selectChallenge = (state)=>state.challenge.challenge;
export const {setChallenge} = challengeSlice.actions;
