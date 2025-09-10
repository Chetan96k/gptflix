import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnGptSearchPage: false,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    goToGptSearch: (state) => {
      state.isOnGptSearchPage = true;
    },
    goToHome: (state) => {
      state.isOnGptSearchPage = false;
    },
  },
});

export const { goToGptSearch, goToHome } = pageSlice.actions;
export default pageSlice.reducer;
