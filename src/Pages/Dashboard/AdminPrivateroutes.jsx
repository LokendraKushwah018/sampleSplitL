import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
 const AdminPrivateroutes=()=>{
    // let  userid = localStorage.getItem("logintoken") == null ? false : true;
     const admin = useSelector(state=>state.admin.adminlogintoken)
    return (
        <>
            {admin ? <Outlet  /> : <Navigate to="/Dashboard" />};
        </>

    )
    }
export default AdminPrivateroutes;