import { createSlice } from "@reduxjs/toolkit";

export const AdminEmailSlice = createSlice({
    name: "adminemail",
    initialState: {
        adminEmail: null
    },
   reducers: {
    adminforgot: (state ,action) => {
        state.adminEmail = action.payload;
    },
   }
})

export const {adminforgot} = AdminEmailSlice.actions;
export const selectAuth = (state) => state.adminemail;
export default AdminEmailSlice.reducer;
 
