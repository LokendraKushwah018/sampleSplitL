import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BuyPlan = () => {
    const token = localStorage.getItem("userlogintoken");
    const [getPeymentDetails, setPeymentDetails] = useState('');
    let [plan, setPlan] = useState([]);
    console.log(token);
    const Waittoast = () => {
        toast.info("Wait for a Second ");
    }

    // const BuyPlantoast = () => {
    //     toast.success("Login Successfully !")
    // };

    const payment = () => {
        // BuyPlantoast();
        axios(
            {
                url: 'http://localhost:5001/api/user/getAllSubscription',
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }
        ).then((response) => {
            console.log(response);
            setPeymentDetails(response.data.subscription[0]);
            console.log(response.data.subscription[0]);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        payment();
    }, [])

    // Buy Plan

    const buyPlan = (id) => {
        Waittoast();
        console.log(id);
        axios(
            {
                url: `http://localhost:5001/api/user/Pay/${id}`,
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }
        ).then((res) => {
            console.log(res.data.links);
            console.log(id);
            const subcriptionid = id;
            localStorage.setItem("ID", subcriptionid);
            // console.log(plan.links);
            if (res.status === 200) {
                window.location.href = res.data.links
                // window.location.href=("https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-3KS79219C60410104")
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <div>
                <h1><b>Unlimited Downloads , Excusive Original Content and More</b></h1>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', margin: '50px' }}>
                <div className="card" style={{ width: '400px', background: '#1F2D5A', borderRadius: '10px', margin: '50px' }}>
                    <div className="card-body">
                        <h5 className="card-title text-white"><b>SampleSplit</b></h5>
                        <div style={{ margin: '100px' }}>
                            <h1 className="card-subtitle mb-2 text-muted text-center">{getPeymentDetails.subscriptionTitle}</h1>
                            <h4 className="card-text text-center text-white">$&nbsp;{getPeymentDetails.subscriptionPrice}</h4>
                        </div>
                        <button onClick={() => buyPlan(getPeymentDetails.id)}
                            style={{ width: '370px', height: '50px', background: '#2F76DB', borderRadius: '50px', border: 'none', color: 'white' }}>
                            <h4><b>Buy</b></h4></button>
                        <ToastContainer
                            autoClose={1500}
                            position="top-center"
                            className="toast-container"
                            toastClassName="dark-toast"
                            theme="colored" />
                    </div>
                </div>
                <div className="card" style={{ width: '400px', background: '#2F76DB', borderRadius: '10px', margin: '50px' }}>
                    <div className="card-body">
                        <h5 className="card-title text-white"><b>SampleSplit</b></h5>
                        <div style={{ margin: '100px' }}>
                            <h1 className="card-subtitle mb-2 text-muted text-center">1 Year</h1>
                            <h4 className="card-text text-center text-white">$ 30.99</h4>
                        </div>
                        <button
                            style={{ width: '370px', height: '50px', background: '#1F2D5A', borderRadius: '50px', border: 'none', color: 'white' }}>
                            <h4><b>Buy</b></h4></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyPlan