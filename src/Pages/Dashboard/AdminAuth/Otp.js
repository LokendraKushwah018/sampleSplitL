import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const updateotp = () => {
    toast.success('Now you can create new password')
}

const Expiredotp = () => {
     toast.error('Your OTP has been Expired')
   
}
const Wrongotp = () => {
    toast.error('Please fill correct OTP')
  
}

const Otp = () => {
    const [updatedata, setUpdateData] = useState({email: "" , otp: ""})

    const Navigate = useNavigate();

    const data = (e) => {
        setUpdateData({...updatedata , [e.target.name]: e.target.value })
    }

    const update = (e) => {
        e.preventDefault();
        axios.post('http://43.205.187.52:5001/api/admin/otpVerify',updatedata)
        .then((response)=> {
            console.log(response)
         if(response.status === 200){
            updateotp();
           setTimeout(()=>{
            Navigate('/ResetPassword')
           }, 2000)

         }
        //  else if(response.data.message === "Your OTP is expired" ){
        //     Expiredotp();
        //     console.log('helloooooo')
        //  } else{
        //     console.log('please type correct OTP')
        //  }
            
        }).catch((error) => {
            console.log(error)
           if(error.response.status === 400 ){
             Expiredotp();
            //  console.log('helloooooo')
          } else{
            Wrongotp();
            //  console.log('please type correct OTP')
          }
            // Expiredotp();
        })
    }
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
                                <form onSubmit={update}>
                                <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" name="email" 
                                        onChange={data} value={updatedata.email}
                                        placeholder="Enter Your Email"
                                            />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">OTP</label>
                                        <input type="number" id="number" className="form-control" name="otp"                                       
                                        placeholder="Enter OTP" onChange={data} value={updatedata.otp}
                                             />
                                    </div>                                    
                                    <div className="mb-3 d-grid">
                                        <button type="submit" className="btn btn-secondary" >
                                            Reset Password
                                        </button>
                                    </div>
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
