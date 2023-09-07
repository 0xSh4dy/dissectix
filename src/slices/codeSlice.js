import { createSlice } from "@reduxjs/toolkit";

export const codeSlice = createSlice({
    name:"code",
    initialState:{
        code:{
            code:"",
            chall_id:""
        }
    },
    reducers:{
        setCurrentCode:(state,action)=>{
            state.code = action.payload;
        }
    }
});

export default codeSlice.reducer;

export const {setCurrentCode} = codeSlice.actions;
export const selectCode = (state)=>state.code.code;