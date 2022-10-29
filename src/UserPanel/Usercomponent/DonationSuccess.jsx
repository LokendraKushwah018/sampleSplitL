import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function DonationSuccess() {
    const [loading, setloading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem("userlogintoken")
    const Donationtoast = () => {
        toast.success("Donate Successfully !")
    };
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const PayerID = urlParams.get('PayerID');
    console.log(paymentId);
    console.log(PayerID);
    const amount = localStorage.getItem("ammount");
    useEffect(() => {
        axios(
            {
                //http://localhost:5001/api/user/successDonation?PayerID=UUNF2ES4R8LUL&paymentId=PAYID-MNFKHUA4M036060DK8155434&amount=20
                url: `http://localhost:5001/api/user/successDonation?PayerID=${PayerID}&paymentId=${paymentId}&amount=${amount}`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then((res) => {
            setloading(false);
            console.log(res);
            Donationtoast();
            if (res.status === 200) {
                setTimeout(() => {
                    navigate("/Freestem")
                }, 2000)
                localStorage.removeItem("ammount");
            }
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