import { createSlice } from "@reduxjs/toolkit";

export const functionSlice = createSlice({
    name:"function",
    initialState:{
        function:""
    },
    reducers:{
        setFunction:(state,action)=>{
            state.function = action.payload;
        }
    }
});

export default functionSlice.reducer;
export const {setFunction} = functionSlice.actions;
export const selectFunction = (state)=>state.function.function;