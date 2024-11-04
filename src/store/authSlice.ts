import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    // isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
    isLoggedIn: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", "true");
        },
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.setItem("isLoggedIn", "false");
            Cookies.remove('access_token');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
