import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateOTP = () => {
    toast.success('Please Create New Password')
}

const Expiredotp = () => {
    toast.error('Your OTP has been Expired')  
}

const Wrongotp = () => {
   toast.error('Please Fill Correct OTP') 
}

const Userotp = () => {
    const [data, setData] = useState({email: '' , otp: ''})

    const Navigate = useNavigate();

    const update = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const userData = (e) => {
        e.preventDefault();
     axios.post('http://43.205.187.52:5001/api/admin/otpVerify',data)
     .then((response)=> {
        console.log(response)
        if(response.status === 200){
            updateOTP()
         
            setTimeout(()=> {
                Navigate('/Userresetpassword')
            }, 2000)
        }
     }).catch((error)=> {
        console.log(error)
        if(error.response.status === 400 ){
            Expiredotp();
         } else{
           Wrongotp();
         }
     })        
    }

    return(
        <div>
            <ToastContainer
          autoClose={2000}
          position="top-center"
          className="toast-container"
          toastClassName="dark-toast"
          theme="colored" />
            <div className="container d-flex flex-column ">
                <div className="row align-items-center justify-content-center min-vh-100 ">
                    <div className="col-12 col-md-8 col-lg-8 ">
                        <div className="card shadow-sm bg-dark">
                            <div className="card-body">
                                <h1 className='text-blue mb-5'>SampleSplit.com</h1>
                                <div className="mb-4">
                                    <h5>User Forgot Password?</h5>
                                    <p className="mb-2">Enter your registered email ID to reset the password
                                    </p>
                                </div>

                                <form onSubmit={userData}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" name="email"                                        
                                        placeholder="Enter Your Email" value={data.email} onChange={update}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="otp" className="form-label">OTP</label>
                                        <input type="number" id="otp" className="form-control" name="otp"                                        
                                        placeholder="Enter Your OTP" value={data.otp} onChange={update}/>
                                    </div>
                                    <div className="mb-3 d-grid">
                                        <button type="submit" className="btn btn-secondary" >
                                            Reset Password
                                        </button>
                                    </div>
                                </form>                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Userotp