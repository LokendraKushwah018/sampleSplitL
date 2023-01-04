import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updatetoast = () => {
    toast.success('OTP Successfully sent')
}

const WrongEmail = () => {
    toast.error('EmailID does not Match')
}


const Userforgetpassword = () => {
    const [email, setEmail] = useState('')

    const Navigate = useNavigate();

    const forgotpassword = (e) => {
        e.preventDefault()
        axios.post('http://43.205.187.52:5001/api/admin/forgetPassword', {
            email: email
        }).then((Response) => {
            console.log(Response)
            if (Response.status === 200) {
                updatetoast();
                setTimeout(() => {
                    Navigate('/Userotp')
                })
            }
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
                WrongEmail();
            }
        })
    }

    return (
        <div >
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
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" name="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Your Email" />
                                    </div>
                                    <div className="mb-3 d-grid">
                                        <button type="submit" className="btn btn-secondary" onClick={forgotpassword}>
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

export default Userforgetpassword