import {createSlice } from "@reduxjs/toolkit";
export const adminSlice = createSlice({
    name : "admin",
    initialState: {
        isLoggedIn: false,
        adminlogintoken: null
    },
    reducers:{
        adminlogin: (state, action)=>{
            state.isLoggedIn = true
            state.adminlogintoken = action.payload;
        },
        adminlogout:(state)=>{
            state.isLoggedIn = false
            state.adminlogintoken = null
            localStorage.removeItem("adminlogintoken");

        },
    },
});
  
export const {adminlogin,adminlogout}=adminSlice.actions;
export const selectAuth = (state) => state.admin;
export default adminSlice.reducer;