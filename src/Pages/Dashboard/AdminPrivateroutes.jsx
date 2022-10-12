import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
 const AdminPrivateroutes=()=>{
    let  userid = localStorage.getItem("logintoken") == null ? false : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/Dashboard" />};
        </>

    )
    }
export default AdminPrivateroutes;