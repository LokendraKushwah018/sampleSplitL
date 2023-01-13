import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { userbaseurl } from '../../Api/Config'
// import { getUserDetail } from '../../Api/Config'
// import { logout } from './Auth/AuthSlice'
const Privateroutes = () => {
    const user = useSelector(state => state.auth.userlogintoken)
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    // var access = false
    const UserDetails = (e) => {
        axios(
            {
                url: `${userbaseurl}token`,
                method: "get",
                headers: {
                    "Authorization": `Bearer ${user}`,
                    "Content-Type" : "application/json"
                },
            }
        )
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                if (err.message === "Request failed with status code 401") {
                       localStorage.removeItem("persist:persist-store");
                    //    e.preventDefault();
                    // dispatch(logout());
                    Navigate("/");

                }
                console.log(err);
            })
    }
    UserDetails()
    return (
        <>
            {user ? <Outlet /> : <Navigate to="/Home" />};
        </>

    )
}
export default Privateroutes;
