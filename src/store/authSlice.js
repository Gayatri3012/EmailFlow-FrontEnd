import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: (() => {
    try {
      const user = localStorage.getItem("user");
      return user && user !== "undefined" && user !== "null" ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  })(),
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
