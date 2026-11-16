import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import langReducer from "./langSlice";

export const store = configureStore({ reducer: { auth: authReducer, lang: langReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
