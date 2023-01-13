import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockIcon from '@mui/icons-material/Lock';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userbaseurl } from "../../../../Api/Config";
import WelcomeNavbar from "../../../../UserPanel/Usercomponent/Welcomepage/WelcomeNavbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { login } from "../../Auth/AuthSlice";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";

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
  },
  floatingLabelFocusStyle: {
    color: "white"
  }, multilineColor: {
    color: 'red'
  }

}));

export default function UserLogIn() {

  const userlogintoast = () => {
    toast.success("Login Successfully !")
  };

  const usererrortoast = () => {
    toast.error("Invalid Credential ")
  }

  let Navigate = useNavigate();
  const classes = useStyles();
  let [formErrors, setformErrors] = useState({});
  let [isSubmit, setIsSubmit] = useState(false);
  // const [passwordShown, setPasswordShown] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  let [data, updateData] = useState({ email: '', password: '' });
  const dispatch = useDispatch()

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const display = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    setformErrors(validate(data));
    logInApi();
    setIsSubmit(true);
  };
  const logInApi = () => {
    axios(
      {
        url: `${userbaseurl}login`,
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
        const userlogintoken = response.data.token
        dispatch(login(userlogintoken))
        // localStorage.setItem('userlogintoken', userlogintoken)          
        if (response.status === 200) {
          userlogintoast();
          setTimeout(() => {
            Navigate('/Home')
          }, 1000)
        }    
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401){
          usererrortoast();
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
    <>
      <WelcomeNavbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LogIn
          </Typography>
          <form className={classes.form} onSubmit={submit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <InputLabel>
        Enter your Email
      </InputLabel>
                <Input
                  // variant="outlined"
                  inputlabelprops=
                  {{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  // sx={{ input: { color: 'red !important' } }}
                 
                  required
                  fullWidth                 
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={display}
                // fontColor="red !important"
                />
                <small style={{ color: 'red' }} >{formErrors.email}</small>
              </Grid>
           
              <Grid item xs={12} >
              <InputLabel >
        Enter your Password
      </InputLabel>
                <Input
                  // variant="outlined"
                  inputlabelprops=
                  {{
                    className: classes.floatingLabelFocusStyle,
                    // color : "white"
                  }}
                  required
                  fullWidth
                  name="password"
                  type={passwordType==="password"? "password" : "text"}   
                  autoComplete="current-password"
                  value={data.password}
                  onChange={display}
                  className={classes.input}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                       
                        onMouseDown={togglePassword}
                      >
                        {passwordType==="text" ? <i className="fas fa-eye"></i> :<i className="fas fa-eye-slash"></i>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <small style={{ color: 'red' }} >{formErrors.password}</small>
              </Grid> 
            </Grid><br/>
         <Link to='/Userforgetpassword' style={{textDecoration: 'none', color: 'silver'}}><b 
         >Forgot Password?</b>
          {/* <button type="button" class="btn btn-success mt-3" >Forget Password</button> */}
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <ToastContainer
              autoClose={1000}
              position="top-center"
              className="toast-container"
              toastClassName="dark-toast"
              theme="colored" />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/Usersignup" variant="body2">
                  Don't have an account? SignUp
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>
    </>
  );
}