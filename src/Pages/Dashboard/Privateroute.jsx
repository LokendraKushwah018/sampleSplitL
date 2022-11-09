import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
 const Privateroutes=()=>{
    const user = useSelector(state=>state.auth.userlogintoken)
    return (
        <>
            {user ? <Outlet /> : <Navigate to="/Home" />};
        </>

    )
    }
export default Privateroutes;
