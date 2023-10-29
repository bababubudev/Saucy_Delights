import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { GetUser } from "@/types/User";
import axios from "axios";

interface userSliceState {
    users:  GetUser[] | null;
    currentUser: GetUser | null;
    error: string | null;
    loading: boolean;
    currentToken: string | null;
}

const initialState: userSliceState = {
    users: null,
    currentUser: null,
    error: null,
    loading: false,
    currentToken: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
    }
})

export default userSlice.reducer;