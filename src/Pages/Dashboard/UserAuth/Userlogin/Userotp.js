import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateOTP = () => {
    toast.success('Please Create New Password')
}

const resendOTP = () => {
    toast.success("OTP Successfully Send")
}

const Expiredotp = () => {
    toast.error('Your OTP has been Expired')
}

const Wrongotp = () => {
    toast.error('Please Fill Correct OTP')
}

const Userotp = () => {
    const [data, setData] = useState('')
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [change, setChange] = useState(false)

    const selector = useSelector((state) => state.forgot.userEmail)
    const Navigate = useNavigate();

    const Resend = (e) => {
        e.preventDefault();
        axios({
            url: 'http://43.205.187.52:5001/api/user/forgetPassword',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                email: selector
            }

        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setChange(true)
                resendOTP()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const userData = (e) => {
        // console.log(selector, data)
        e.preventDefault()
        axios({
            url: 'http://43.205.187.52:5001/api/user/otpVerify',
            method: "post",
            headers: {
                'Content-Type': 'application/json'

            },
            data: {
                email: selector,
                otp: data
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                updateOTP()
                setTimeout(() => {
                    Navigate('/Userresetpassword')
                }, 2000)
            }

        }).catch((error) => {
            console.log(error)
            if (error.response.status === 400) {
                Expiredotp();
            } else {
                Wrongotp();
            }
        })
    }

    // const userData = (e) => {
    //     e.preventDefault();
    //     axios.post('http://43.205.187.52:5001/api/user/otpVerify', {
    //     data: {
    //         email: selector,
    //         otp: data.otp ,
    //     }
    // }
    //     )
    //         .then((response) => {
    //             console.log(response)
    //             if (response.status === 200) {
    //                 updateOTP()

    //                 setTimeout(() => {
    //                     Navigate('/Userresetpassword')
    //                 }, 2000)
    //             }
    //         }).catch((error) => {
    //             console.log(error)
    //             if (error.response.status === 400) {
    //                 Expiredotp();
    //             } else {
    //                 Wrongotp();
    //             }
    //         })
    // }
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

    return (
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

                                <form
                                // onSubmit={userData}
                                >
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" name="email"
                                            placeholder="Enter Your Email" value={selector} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="otp" className="form-label">OTP</label>
                                        <input type="number" id="otp" className="form-control" name="otp"
                                            placeholder="Enter Your OTP" value={data} onChange={(e) => setData(e.target.value)} />
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
                                            <button type="submit" className="btn btn-secondary text-white" onClick={userData}>
                                                Verify & Proceed
                                            </button>
                                            :
                                            <div  className="mb-3 d-grid">
                                            {!change ? <button type="submit" className='btn btn-secondary text-white' onClick={Resend}
                                                >Resend OTP
                                                </button>:
                                                <div className="mb-3 d-grid">
                                            <button type="submit" className="btn btn-secondary text-white" onClick={userData}>
                                                Verify & Proceed
                                            </button>                                       
                                                </div>
                                        }
                                            </div >}
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