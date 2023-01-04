import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const updatetoast = () => {
    toast.success('OTP Successfully sent')
}

const InvalidID = () => {
    toast.error('Email ID does not Match')
}

const Forgetpassword = () => {
// const token = useSelector(state=>state.admin.adminlogintoken)

    const [email, setEmail] = useState()
    // const [updateotp, setUpdateotp] = useState(false)
    let Navigate = useNavigate()

    const reset = (e) => {
        console.log(email)
        e.preventDefault()
        // axios({
        //     url: 'http://43.205.187.52:5001/api/admin/forgetPassword',
        //     method: 'post',
        //     headers:{
        //         "content-type": 'application-JSON'
        //     },
        //     data: {
        //         email: email
        //     }
        // })
        axios.post('http://43.205.187.52:5001/api/admin/forgetPassword', {
            email: email
        })
        .then((response) => {
            console.log(response)
            console.log(response.data.message)
            if(response.status === 200){
                updatetoast();
                setTimeout(()=> {
                    Navigate('/Otp')
         },2000)
          
            }
        }).catch((error)=> {
            console.log(error)
            if(error.response.status === 401){
                InvalidID()
            }
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
                                    <p className="mb-2">Enter your registered email ID to reset the password
                                    </p>
                                </div>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" name="email" 
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Email"
                                             />
                                    </div>
                                    {/* {updateotp &&                                     
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">OTP</label>
                                        <input type="email" id="email" className="form-control" name="email"                                         
                                        placeholder="Enter Your OTP"/>
                                    </div> }                                     */}
                                    <div className="mb-3 d-grid">
                                        <button type="submit" className="btn btn-secondary" onClick={reset}>
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

export default Forgetpassword
