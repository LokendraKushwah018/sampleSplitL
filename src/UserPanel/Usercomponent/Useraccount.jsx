import React from 'react'
import Navbar from '../UserBackend/Navbar'
import "../css/useraccount.css"
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const Useraccount = () => {
    const token = localStorage.getItem("userlogintoken")
    const [data, setData] = useState([]);
    const [plandata, setPlandata] = useState(false);

    const [plandetails, setPlandetails] = useState([]);
    const plan = () => {
        axios(
            {
                url: 'http://localhost:5001/api/user/getUserDetail',
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }
        ).then((res) => {
            console.log(res);
            setData(res.data.getData);
            if (res.data.PlanData) {
                setPlandata(true)
                setPlandetails(res.data.PlanData)
            }
            console.log(res.data.getData);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        plan();
    }, [])
    return (
        <>
            <Navbar />
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7", fontFamily: 'proxima nova'}}>
                <div className="container py-5 h-100" >
                    <div className="row d-flex justify-content-center align-items-center h-100" >
                        <div className="col col-lg-6 mb-4 mb-lg-0" style={{ width: '100%' }}>
                            <div className="card mb-5" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0" style={{ width: '100%' }}>
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ borderRadius: ".5rem" }}>
                                        <img src="./bg.jpg"
                                            alt="userprofile" className="img-fluid my-5" style={{ width: "180px", height: "180px", borderRadius: "90px" }} />
                                        <h5>{data.username}</h5>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Name</h6>
                                                    <p className="text-muted">{data.username}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{data.email}</p>
                                                </div>
                                            </div>
                                            {plandata &&
                                                <div>
                                                    <h6>Subscription Details</h6>
                                                    <hr className="mt-0 mb-4" />

                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Plan</h6>
                                                            <p className="text-muted">{plandetails.subscriptionTitle}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>Expire</h6>
                                                            <p className="text-muted">{plandetails.expireIn}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Useraccount