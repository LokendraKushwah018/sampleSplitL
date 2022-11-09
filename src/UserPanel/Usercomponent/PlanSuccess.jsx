import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function PlanSuccess() {
    const [loading, setloading] = useState(true);
    const token = useSelector(state=>state.auth.userlogintoken)

    // const token = localStorage.getItem("userlogintoken")

    const navigate = useNavigate();
    const id = localStorage.getItem("ID")

    const Plantoast = () => {
        toast.success("Payment Successfully !")
    };

    console.log(id);


    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const PayerID = urlParams.get('PayerID');
    console.log(paymentId);
    console.log(PayerID);

    useEffect(() => {
        axios(
            {
                url: `http://localhost:5001/api/user/paymentSuccess/${id}?PayerID=${PayerID}&paymentId=${paymentId}`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then((res) => {
            setloading(false);
            console.log(res);
            Plantoast();
            setTimeout(() => {
                if (res.status === 200) {
                    navigate("/Freestem")
                }
            }, 2000)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <ToastContainer
                autoClose={1000}
                position="top-center"
                className="toast-container"
                toastClassName="dark-toast"
                theme="colored" />
            {
                loading &&
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "300px" }}>
                    <CircularProgress /><Typography>Loading...</Typography>
                </Box>
            }
        </>
    );
}