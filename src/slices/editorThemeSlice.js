import { createSlice } from "@reduxjs/toolkit";

export const editorThemeSlice = createSlice({
    name:"editorTheme",
    initialState:{
        theme:"vs-dark"
    },
    reducers:{
        setEditorTheme:(state,action)=>{
            state.theme = action.payload
        }
    }
});

export default editorThemeSlice.reducer;
export const selectEditorTheme = (state)=>state.editorTheme.theme;
export const {setEditorTheme} = editorThemeSlice.actions;