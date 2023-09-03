import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import tokenReducer from "../slices/tokenSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: "root",
    storage
}

const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);

const store = configureStore(
    {
        reducer: {
            token: persistedTokenReducer
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
