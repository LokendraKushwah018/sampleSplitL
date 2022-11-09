import { combineReducers } from "redux";
import authReduce from '../Pages/Dashboard/Auth/AuthSlice'
import AdminSlice from '../Pages/Dashboard/Auth/AdminSlice'

// import usersReducer from "../Pages/Users/UsersSlice";
const RootReducer = combineReducers({
    auth: authReduce,
    admin : AdminSlice,
    // users: usersReducer
});
export default RootReducer;