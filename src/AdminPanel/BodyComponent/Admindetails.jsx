import React from 'react'
import { useState } from 'react'
import './AdminDetails.css'
import axios from 'axios';
import { useEffect } from 'react';
import { PageHeader } from '../Common/Components';
import { Box } from '@mui/material';
import { admindetailsedit, adminprofile, changepassword } from '../../Api/Config';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@material-ui/core';
import { Modal } from '@mui/material';
import Container from '../../Components/Adminlayout/Container';
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
          localStorage.removeItem('logintoken');
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
          localStorage.removeItem('logintoken');
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
        <section className="profile">
          <header className="header">
            <div className="details">
              <img src="./mlsa.jpg" alt="John Doe" className="profile-pic" />
              <h1 className="heading">{data.name}</h1>
              <div className="stats">
                <div className="col-6">
                  <h5>Name&nbsp;<sup><EditIcon onClick={handleOpen} sx={{height:'20px'}} /></sup></h5>
                  <p>{data.name}</p>
                </div>
                <div className="col-6">
                  <h5>Email&nbsp;
                  <sup><EditIcon onClick={handleOpen} sx={{height:'20px'}}  /></sup></h5>
                  <p >{data.email}</p>
                </div>
              </div>
              <div className='col-12'>
                <button className='btn btn_button'
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo">Change password</button>
              </div>
            </div>
          </header>
        </section>
        {/* Admin Profile End*/}

        {/*  Admin Change Profile Model Start  */}

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
                <label>Name</label>
                <input type="text" className="form-control" 
                name='name' value={profile.name} onChange={display}
                placeholder="Enter email" />
              </div>
              <div className="form-group m-1">
                <label>Email</label>
                <input type="email" className="form-control" 
                name='email' value={profile.email} onChange={display}
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

          {/* Admin Change Profile Model End  */}

        {/* Admin Change Password Model Start  */}
        <div className="modal fade mt-5" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={updateAdmin}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="col-form-label">New password</label>
                    <input type="text" value={changepass.password} onChange={show}
                      name="password"
                      // / onChange={(e) => setName(e.target.value)} 
                      className="form-control" id="recipient-name" />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Confirm password</label>
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
            </div>
          </div>
        </div>
        {/* Admin Change Password Model End  */}
      </Container>
    </>
  )
}
