import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
 const Privateroutes=()=>{
    let  userid = localStorage.getItem("userlogintoken") == null ? false : true;
    return (
        <>
            {userid ? <Outlet /> : <Navigate to="/Home" />};
        </>

    )
    }
export default Privateroutes;
