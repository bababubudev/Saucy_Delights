import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})
