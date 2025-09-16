import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        recommendations: [],
    },
    reducers: {
        setRecommendations: (state, action) => {
            state.recommendations = action.payload;
        },
    },
});

export const { setRecommendations } = gptSlice.actions;

export default gptSlice.reducer;
