import { createSlice } from "@reduxjs/toolkit"

export const EmailSlice = createSlice({
    name : "email",
    initialState: {
        userEmail : null
    },
    reducers:{
        forgot: (state, action)=>{
            // state.isLoggedIn = true
            state.userEmail = action.payload;
        },
    }
})

export const {forgot}=EmailSlice.actions;
export const selectAuth = (state) => state.email;
export default EmailSlice.reducer;