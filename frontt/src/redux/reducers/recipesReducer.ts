import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

import Recipe from "../../types/Recipe"

interface RecipesState {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipesState = {
    recipes: [],
    loading: false,
    error: null
}

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        
    }
})

// export const {} = recipesSlice.actions;
const recipesReducer = recipesSlice.reducer;
export default recipesReducer;

