import {createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name : "auth",
    initialState: {
        isLoggedIn: false,
        userlogintoken: null
    },
    reducers:{
        login: (state, action)=>{
            state.isLoggedIn = true
            state.userlogintoken = action.payload;
        },
        logout:(state)=>{
            state.isLoggedIn = false
            state.userlogintoken = null
            // const token = useSelector(state=>state.auth.userlogintoken)
            // localStorage.removeItem("userlogintoken");

        },
    },
});
  
export const {login,logout}=authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;