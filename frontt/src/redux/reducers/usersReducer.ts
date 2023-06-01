import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

import User from "../../types/User"

interface UsersState {
    users: User[];
    currentUser: User | null;
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: UsersState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    token: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    }
})

// export const {} = usersSlice.actions;
const usersReducer = usersSlice.reducer;
export default usersReducer;
