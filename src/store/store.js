import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import tokenReducer from "../slices/tokenSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import challengeReducer from "../slices/challengeSlice";
import editorThemeReducer from "../slices/editorThemeSlice";
import functionReducer from "../slices/functionSlice";
import codeReducer from "../slices/codeSlice";

const persistConfig = {
    key: "root",
    storage
}

const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);
const persistedEditorThemeReducer = persistReducer(persistConfig,editorThemeReducer);
const persistedCodeReducer = persistReducer(persistConfig,codeReducer);

const store = configureStore(
    {
        reducer: {
            token: persistedTokenReducer,
            challenge:challengeReducer,
            editorTheme:persistedEditorThemeReducer,
            function:functionReducer,
            code:persistedCodeReducer
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    }
);

const persistor = persistStore(store);
export {persistor};
export default store;
