import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const updateotp = () => {
    toast.success('Now you can create new password')
}

const resendotp = () => {
    toast.success('OTP send Successfully')
}

const Expiredotp = () => {
     toast.error('Your OTP has been Expired')
   
}
const Wrongotp = () => {
    toast.error('Please fill correct OTP')
  
}

const Otp = () => {
    const [updatedata, setUpdateData] = useState('')
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [get, setGet] = useState(false)

    const adminselector = useSelector(state =>state.adminforgot.adminEmail)

    const Navigate = useNavigate();

    const forgot = (e) => {
        e.preventDefault();

        axios({
            url: 'http://43.205.187.52:5001/api/admin/otpVerify',
            method: 'post',
            headers:{
                "Content-Type" : "application/json"
            },
            data:{
                email: adminselector,
                otp: updatedata
            }
        }).then((response)=> {
            console.log(response)
            if(response.status === 200){
                         updateotp();
                        setTimeout(()=>{
                         Navigate('/ResetPassword')
                        }, 2000)
                      } 
        }).catch((error)=>{
            console.log(error)
            if(error.response.status === 400 ){
                          Expiredotp();
                       } else{
                        Wrongotp();
                       }
        })
    }

    const adminotp = (e) => {
        e.preventDefault()
        axios({
            url: 'http://43.205.187.52:5001/api/admin/forgetPassword',
            method: 'post',
            headers:{
                "Content-Type": "application/json"
            },
            data:{
                email: adminselector
            }
        }).then((response)=> {
            console.log(response)
            if(response.status === 200){
                resendotp()
                setGet(true)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0 ) {
                setSeconds(seconds - 1);
               
            }

            if (seconds === 0 ) {
                if (minutes === 0 ) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                   
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    // const data = (e) => {
    //     setUpdateData({...updatedata , [e.target.name]: e.target.value })
    // }

    // const update = (e) => {
    //     e.preventDefault();
    //     axios.post('http://43.205.187.52:5001/api/admin/otpVerify',updatedata)
    //     .then((response)=> {
    //         console.log(response)
    //      if(response.status === 200){
    //         updateotp();
    //        setTimeout(()=>{
    //         Navigate('/ResetPassword')
    //        }, 2000)
    //      }            
    //     }).catch((error) => {
    //         console.log(error)
    //        if(error.response.status === 400 ){
    //          Expiredotp();
    //       } else{
    //         Wrongotp();
    //       }
    //     })
    // }
  return (
    <div>
            <ToastContainer
          autoClose={2000}
          position="top-center"
          className="toast-container"
          toastClassName="dark-toast"
          theme="colored" />
            <div className="container d-flex flex-column">
                <div className="row align-items-center justify-content-center min-vh-100">
                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h1 className='text-blue mb-5'>SampleSplit.com</h1>
                                <div className="mb-4">
                                    <h5>Admin Forgot Password?</h5>
                                    <p className="mb-2"> Enter OTP which is sent at your registered email ID to reset the password
                                    </p>
                                </div>
                                <form >
                                <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" name="email" 
                                        value={adminselector}
                                        placeholder="Enter Your Email"
                                            />
                                    </div>
                                {/* <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" name="email" 
                                        onChange={(e)=> setUpdateData(e.target.value)} value={updatedata.email}
                                        placeholder="Enter Your Email"
                                            />
                                    </div> */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">OTP</label>
                                        <input type="number" id="number" className="form-control" 
                                        name="otp" placeholder="Enter OTP" 
                                        onChange={(e)=> setUpdateData(e.target.value)} value={updatedata}
                                             />
                                    </div>  
                                         {/* OTP Timer Setup Start */}
                                         <div className="countdown-text">
                                        {seconds > 0 || minutes > 0 ? (
                                            <p>
                                                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                                {seconds < 10 ? `0${seconds}` : seconds}
                                            </p>
                                        ) : (
                                            <p />
                                        )}                
                                    </div>

                                    {/* OTP Timer Setup end */}   
                                    <div className="mb-3 d-grid">
                                        {seconds > 0 || minutes > 0 ?
                                            <button type="submit" className="btn btn-secondary text-white" onClick={forgot}>
                                                Verify & Proceed
                                            </button>
                                            :
                                            <div  className="mb-3 d-grid">
                                           {!get  ? 
                                           <button type="submit" className='btn btn-secondary text-white' onClick={adminotp}
                                                >Resend OTP
                                                </button>
                                                :
                                                <div  className="mb-3 d-grid">
                                                 <button type="submit" className="btn btn-secondary text-white" onClick={forgot}>
                                                 Verify & Proceed
                                             </button>
                                             </div>}
                                                </div>}
                                                </div>

                                    {/* <div className="mb-3 d-grid">
                                        <button type="submit" className="btn btn-secondary" >
                                            Reset Password
                                        </button>
                                    </div> */}
                                    {/* <span>Don't have an account? <a href="sign-in.html">sign in</a></span> */}
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Otp
