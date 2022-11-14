// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Outlet, Navigate } from 'react-router-dom'
//  const Privateroutes=()=>{
//     const user = useSelector(state=>state.auth.userlogintoken)
//     return (
//         <>
//             {user ? <Outlet /> : <Navigate to="/Home" />};
//         </>

//     )
//     }
// export default Privateroutes;

import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { getUserDetail } from '../../Api/Config'
import { logout } from './Auth/AuthSlice'
const Privateroutes = () => {
    const user = useSelector(state => state.auth.userlogintoken)
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    // var access = false
    const UserDetails = (e) => {
        axios(
            {
                url: `${getUserDetail}`,
                method: "get",
                headers: {
                    "Authorization": `Bearer ${user}`
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
