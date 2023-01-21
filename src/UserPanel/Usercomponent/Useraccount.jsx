import React from 'react'
import Navbar from '../Userlayout/Navbar'
import "../css/useraccount.css"
import { useEffect } from 'react'
import { useState } from 'react'
import {  userbaseurl } from '../../Api/Config'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Footer from '../Userlayout/Footer'

const Useraccount = () => {
    // const token = localStorage.getItem("userlogintoken")
    const token = useSelector(state=>state.auth.userlogintoken)
    const [data, setData] = useState([]);
    const [plandata, setPlandata] = useState(false);
    const [plandetails, setPlandetails] = useState([]);
    const [subscribe, setSubscribe] = useState('')
    
    console.log(token) 
    
    const plan = () => {
        axios(  
            {
                url: `${userbaseurl}getUserDetail`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type":  "application/json"
                },
            }
           
        ).then((res) => {
            console.log(res);
            setData(res.data.getData);
            if (res.data.PlanData) {
                setPlandata(true)
                setPlandetails(res.data.PlanData)
            }
            
            console.log(res.data.PlanData.subscriptionPlanDays);
            setSubscribe(res.data.PlanData.subscriptionPlanDays)
            console.log(plandata)
            console.log(plandetails);
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
            
            <section 
            // className="vh-100" 
            style={{ fontFamily: 'proxima nova'}}>
                <div className="container mt-5 ">                
                    <div className="row d-flex justify-content-center align-items-center h-100" >
                    
                        <div className="col-div " 
                        //  style={{ width: '850px' }}
                        >
                            <div className="card mb-5 "
                                style={{  borderRadius: ".5rem" }}>                                   
                                <div className="row g-0" style={{ width: '100%' }}>
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ borderRadius: ".5rem" }}>
                                        <img src="./bg.jpg"
                                            alt="userprofile" className="img-fluid my-5 mx-3"
                                            style={{ width: "180px", height: "180px", borderRadius: "90px" }} />
                                        <h5 style={{marginRight: '-18px'}}><b className='text-white'>{data.username}</b></h5>
                                    </div>
                                   
                                     <div className="col-md-8">
                                      {/*  {subscribe === "30 Days" ?  ""
                                         : <button  className='subsbutton'>
                                        <Link to='/Buyplan' className='subslink'>
                                        Subscription</Link></button>
                                        } */}
                                   
                                        <div className="card-body p-4">
                                            <h6 style={{display:'inline'}}><b className='information'>Information</b></h6>                                            
                                            {subscribe === "30 Days" ?  ""
                                         : <button  
                                          className='subsbutton' 
                                        //  style={{display:'inline', float:'right', }}
                                        >
                                        <Link to='/Buyplan' className='subslink'>
                                        Subscription</Link></button>
                                        }
                                            <hr className=" mb-4 mt-3" />
                                            {/* <div className="row pt-1"> */}
                                            <div className="usercard">
                                                <div className="col-6 mb-3">
                                                    <b>Name</b>
                                                    <h6 className="text-muted">{data.username}</h6>
                                                </div>
                                                <div className="col-6 mb-3 mr-3">
                                                    <b>Email</b>
                                                    <h6 className="text-muted" >{data.email}</h6>
                                                </div>
                                            </div>
                                            {plandata &&
                                                <div>
                                                    <h6><b className='information'>Subscription Details</b></h6>
                                                    {/* <hr className="mt-0 mb-4" /> */}
                                                    <hr className="planhr" />
                                                    {/* <div className="row pt-1"> */}
                                                    <div className="plandiv">
                                                        <div className="col-6 mb-3">
                                                            <h6><b>Plan</b></h6>
                                                            <p className="text-muted">{plandetails.subscriptionTitle}</p>
                                                        </div>
                                                        <div className="col-6 mb-3 ml-1">
                                                            <h6><b>Expire</b></h6>
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
            <h6 style={{color:"#343a40"}}>fs</h6>  
        <Footer />
        </>
    )
}

export default Useraccount