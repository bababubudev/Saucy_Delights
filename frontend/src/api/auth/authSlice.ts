import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get user from local storage
// const user = JSON.parse(localStorage.getItem("user"))

interface AuthState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  email: string | null;
}

const initialState: AuthState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  email: null,
};

//Register user



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: () => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
