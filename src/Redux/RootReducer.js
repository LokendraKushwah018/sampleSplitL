import { combineReducers } from "redux";
import authReduce from '../Pages/Dashboard/Auth/AuthSlice'
import AdminSlice from '../Pages/Dashboard/Auth/AdminSlice'
import EmailSlice from "../Pages/Dashboard/Auth/EmailSlice";
import AdminEmailSlice from "../Pages/Dashboard/Auth/AdminEmailSlice";
// import { EmailSlice } from "../Pages/Dashboard/Auth/EmailSlice";

// import usersReducer from "../Pages/Users/UsersSlice";
const RootReducer = combineReducers({
    auth: authReduce,
    admin : AdminSlice,
    forgot : EmailSlice,
    adminforgot : AdminEmailSlice
    // users: usersReducer
});
export default RootReducer;