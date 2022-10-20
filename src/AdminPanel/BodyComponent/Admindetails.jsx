import React from 'react'
import { useState } from 'react'
// import '../BodyComponent/AdminDetails.css'
import './AdminDetails.css'
import axios from 'axios';
import { useEffect } from 'react';
import { PageHeader } from '../Common/Components';
import { Box } from '@mui/material';
import { admindetailsedit, adminprofile, changepassword } from '../../Api/Config';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@material-ui/core';
import { Modal } from '@mui/material';
import Container from '../../Components/Layout/Backend/Container';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AdminDetails() {
  let [data, updatedata] = useState([]);
  let [changepass, updatechangepass] = useState({ password: "", confirmPassword: "" });
  let [profile, updateprofile] = useState({ name: "", email: "" });
  let token = localStorage.getItem("logintoken")
  const navigate = useNavigate();
  const adminchangepasswordtoast = () => {
    toast.success("Password Change Successfully !")
  };
  const adminchangedetailstoast = () => {
    toast.success("Change Details Successfully !")
  };
  useEffect(() => {
    AdminProfile();
  }, []);

  // Admin Details API
  const AdminProfile = () => {
    axios(
      {
        url: `${adminprofile}`,
        method: "get",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).then((response) => {
      // console.log(response.data)
      console.log(response.data.getAdminData)
      updatedata(response.data.getAdminData);
      updateprofile(response.data.getAdminData);
    })
      .catch((err) => {
        console.log(err);
      })
  }
  const show = (e) => {
    updatechangepass({ ...changepass, [e.target.name]: e.target.value });
  };

  // Admin Change Password API
  const updateAdmin = (e) => {
    e.preventDefault();
    axios(
      {
        url: `${changepassword}`,
        method: "post",
        data: {
          password: changepass.password,
          confirmPassword: changepass.confirmPassword
        },
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token} `
        }
      }
    ).then((res) => {
      console.log(res);
      adminchangepasswordtoast();
      if (res.status === 200) {
        setTimeout(() => {
          localStorage.clear();
          navigate("/adminlogin");
        }, 2000)
      }
    }).catch((err) => {
      console.log(err);
      window.alert("Wrogn Password")

    })
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const display = (e) => {
    updateprofile({ ...profile, [e.target.name]: e.target.value });
    console.log(updateprofile)
  }

  // Admin Edit Profile API
  const updateProfile = (e) => {
    e.preventDefault();
    console.log(profile.name)
    console.log(profile.email)
    axios(
      {
        url: `${admindetailsedit}`,
        method: "post",
        data: {
          name: profile.name,
          email: profile.email
        },
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token} `
        }
      }
    ).then((res) => {
      console.log(res);
      if (res.status === 200) {
        adminchangedetailstoast();
        setTimeout(() => {
          localStorage.clear();
          navigate("/adminlogin");
        }, 2000)
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <>
      <Container>
        <Box mt={2}>
          <PageHeader title='Admin Details' />
        </Box>

      {/* Admin Profile Start */}
        <div className="page-content page-container " id="page-content">
          <div className="padding ">
            <div className="row container d-flex justify-content-center " >
              <div className="col-xl-12 col-md-12">
                <div className="card user-card-full bg-#BDDD96 " style={{ width: "800px" }}>
                  <div className="row m-l-0 m-r-0 " style={{ width: '800px', borderRadius: '20px' }}>
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-10">
                          <img src="https://img.icons8.com/bubbles/100/000000/user.png"
                            className="img-radius"
                            alt="/" />
                        </div>
                        {/* {/ <h6 className="f-w-600">{data.name}</h6> /}
                        {/ <p>sample split</p> /} */}
                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-block">
                        {/* {/ <button className='btn btn-primary' style={{float:'right'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;</button> /} */}
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400">{data.email}</h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Name</p>
                            <h6 className="text-muted f-w-400">{data.name}</h6>
                          </div>
                        </div>
                      </div>
                     {/* Admin Profile End */}


                     {/* Admin Change Password Start  */}
                      <button className="btn btn-outline-info"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@mdo">&nbsp;&nbsp;&nbsp;
                        Change Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <EditIcon></EditIcon>
                      </button>

                       {/* Admin Edit Profile Model Start */}
                      <div style={{ margin: '5px' }}>
                        <button onClick={handleOpen} className="btn btn-outline-primary">&nbsp;&nbsp;&nbsp;
                          Edit Profile &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <EditIcon></EditIcon></button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              Edit Profile
                            </Typography>
                            <form onSubmit={updateProfile} >
                              <div className="form-group m-1">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control" name='name' value={profile.name} onChange={display}
                                  placeholder="Enter email" />
                              </div>
                              <div class="form-group m-1">
                                <label for="exampleInputPassword1">Email</label>
                                <input type="email" className="form-control" name='email' value={profile.email} onChange={display}
                                  placeholder="Password" />
                              </div>
                              <button type="submit" className="btn btn-primary m-1">Submit</button>
                              <ToastContainer
                                autoClose={1000}
                                position="top-center"
                                className="toast-container"
                                toastClassName="dark-toast"
                                theme="colored" />
                            </form>
                          </Box>
                        </Modal>
                      </div>
                      {/* {/ { Admin Edit Profile Model End } /}

                      {/ { Admin Change Password Model Start } /} */}
                      <div class="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog ">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Edit Details</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={updateAdmin}>
                              <div class="modal-body">
                                <div class="mb-3">
                                  <label for="recipient-name" className="col-form-label">New password</label>
                                  <input type="text" value={changepass.password} onChange={show}
                                    name="password"
                                    // / onChange={(e) => setName(e.target.value)} 
                                    className="form-control" id="recipient-name" />
                                </div>
                                <div class="mb-3">
                                  <label for="message-text" className="col-form-label">Confirm password</label>
                                  <input type="text" name='confirmPassword' value={changepass.confirmPassword} onChange={show}
                                    className="form-control" id="recipient-name" />
                                </div>
                                <button className='btn btn-primary' data-bs-dismiss="modal" type="submit">submit</button>
                                <ToastContainer
                                  autoClose={1000}
                                  position="top-center"
                                  className="toast-container"
                                  toastClassName="dark-toast"
                                  theme="colored" />
                              </div>
                            </form>
                            <div class="modal-footer">
                              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary" onClick={submit} >Update</button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {/ { Admin Change Password Model End } /}

                      {/ { Admin Change Password End } /} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </Container>
    </>
  )
}
