import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  username: null, // Store the username
  gender: null, // Store the gender
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.gender = action.payload.gender;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.gender = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
