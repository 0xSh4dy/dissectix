import {createSlice} from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name:"token",
    initialState:{
        token:""
    },
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload;
        }
    }
});

export default tokenSlice.reducer;
export const selectToken = (state)=>state.token.token;
export const {setToken} = tokenSlice.actions;