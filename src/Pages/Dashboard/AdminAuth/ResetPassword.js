import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockIcon from '@mui/icons-material/Lock';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));

  const updatetoast = () => {
    toast.success('Password Updated Successfully')
  }

const ResetPassword = () => {
    const [adminnewPassword, setPassword] = useState({email: '' ,password: '', confirmation_password: ''})
    const classes = useStyles();

    let Navigate = useNavigate();

    const update= (e) => {
        
        setPassword({...adminnewPassword , [e.target.name]: e.target.value })
    }

const updatenew = (e) => {
    e.preventDefault()
    axios.put('http://43.205.187.52:5001/api/admin/resetPassword',adminnewPassword)
    .then((response)=> {
     console.log(response)
     if(response.status === 200){
      updatetoast()
      setTimeout(() => {
        Navigate('/AdminlogIn')
      }, 3000);
        
     }
    })
//   console.log(adminnewPassword)
    
}

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Admin Reset Password
      </Typography>
      <form className={classes.form}  noValidate>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email ID"
              type="email"
              value={adminnewPassword.email}
              onChange={update}
              autoComplete="off"
            />
          </Grid>     
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              value={adminnewPassword.password}
              onChange={update}
              autoComplete="current-password"
            />
          </Grid> 
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmation_password"
              value={adminnewPassword.confirmation_password}
              onChange={update}
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
            />
          </Grid>       
        </Grid>       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={updatenew}
        >
          Login
        </Button>
        <ToastContainer
          autoClose={2000}
          position="top-center"
          className="toast-container"
          toastClassName="dark-toast"
          theme="colored" />
      </form>
      
    </div>

  </Container>
  )
}

export default ResetPassword
