import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockIcon from '@mui/icons-material/Lock';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import {  Link, useNavigate} from "react-router-dom";
import { adminbaseurl } from "../../../Api/Config"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { adminlogin } from "../Auth/AdminSlice";
import { fontSize } from "@mui/system";
import 'react-toastify/dist/ReactToastify.css';

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

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

const errortoast = () => {
  toast.error("Invalid Credential")
}

export default function AdminlogIn() {
  const logintoast = () => {
    toast.success("Login Successfully !")
  };
//   let history = useHistory();
  let Navigate = useNavigate();
  const dispatch = useDispatch()
  const classes = useStyles();
  let [data, updateData] = useState({ email: '', password: '' });
  
  let [formErrors, setformErrors] = useState({});
  let [isSubmit, setIsSubmit] = useState(false);
  const [passwordType, setPasswordType] = useState("password")


  const togglePassword = () => {
    if(passwordType === "password"){
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  };

  const display = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    setformErrors(validate(data));
    AdminlogInApi();
    setIsSubmit(true);

  };
    const AdminlogInApi = () => {
      axios(
        {
          url: `${adminbaseurl}login`,
          method: "post",
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            email: data.email,
            password: data.password
          }
        }
      )
        .then((response) => {
          console.log(response);
        const adminlogintoken = response.data.token
        console.log(response.data.token)
        dispatch(adminlogin(adminlogintoken))

        if (response.status === 200) {
          logintoast();
          setTimeout(() => {
            Navigate('/dashboard');
          }, 2000)
        }
        })
        .catch((err) => {
          console.log(err);
          if(err.response.status === 401){
            errortoast();
          
          }
        })
    }

    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
      }
  
    });
    const validate = (data) => {
      const errors = {}
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!data.email) {
        errors.email = "Email is Required ! ";
      } else if (!regex.test(data.email)) {
        errors.email = "This is not a valid email formate"
      }
      if (!data.password) {
        errors.password = "Password is Required ! ";
      } else if (data.password.length < 4) {
        errors.password = "password must be more than 4 characters"
      }
  
      return errors;
    }
    
  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer
              autoClose={1000}
              position="top-center"
              className="toast-container"
              toastClassName="dark-toast"
              theme="colored" />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin LogIn
        </Typography>
        <form className={classes.form} onSubmit={submit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <InputLabel >
        Enter your Email ID
      </InputLabel>
              <Input
                // variant="outlined"
                required
                fullWidth
                
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={display}
              /><small style={{ color: 'red' }} >{formErrors.email}</small>
            </Grid>
            <Grid item xs={12}>
            <InputLabel >
        Enter your Password
      </InputLabel>
              <Input
                required
                fullWidth
                name="password"                
                type={passwordType==="password" ? "password" : "text"} 
                autoComplete="current-password"
                value={data.password}
                onChange={display}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onMouseDown={togglePassword}>
                      {passwordType==="password" ? <i className="fas fa-eye-slash"/> :<i className="fas fa-eye"/>}
                    </IconButton>
                  </InputAdornment>
                }/>
             <small style={{ color: 'red' }} >{formErrors.password}</small>
            </Grid>
          </Grid><br/>
         <Link to='/Forgetpassword' style={{textDecoration: 'none', color: 'silver'}}>
          <b>Forgot Password?</b>
            </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Login
          </Button>
          <ToastContainer
            autoClose={1000}
            position="top-center"
            className="toast-container"
            toastClassName="dark-toast"
            theme="colored" />
        </form>
        
      </div>

    </Container>
  );
}