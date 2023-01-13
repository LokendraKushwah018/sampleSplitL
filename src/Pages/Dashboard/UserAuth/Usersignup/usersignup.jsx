import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockIcon from '@mui/icons-material/Lock';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import { userbaseurl } from "../../../../Api/Config";
import WelcomeNavbar from "../../../../UserPanel/Usercomponent/Welcomepage/WelcomeNavbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { color } from "@mui/system";
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
  }
}));

export default function Usersignup() {

  const userSingUptoast = () => {
    toast.success("SignUp Successfully !")
  };
  let Navigate = useNavigate();
  const classes = useStyles();
  let [data, updateData] = useState({ username: '', email: '', password: '' });
  let [formErrors, setformErrors] = useState({});
  let [isSubmit, setIsSubmit] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const display = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    
    setformErrors(validate(data));
    setIsSubmit(true);
  };

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const SingUpApi = () => {
    axios(
      {
        url: `${userbaseurl}singup`,
        method: 'post',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      }
    )
      .then((response) => {
        console.log(response);
        userSingUptoast();
          if (response.status === 201) {
            setTimeout(()=>{
              Navigate('/userlogin')
            },2000)
        }
      })
      .catch((err) => {
        console.log(err);

      })
  }
  useEffect(() => {

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      SingUpApi();
    }
  })
  const validate = (data) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!data.username) {
      errors.username = "Username is Required ! ";
    }
    if (!data.email) {
      errors.email = "Email is Required ! ";
    } else if (!regex.test(data.email)) {
      errors.email = "This is not a valid email formate"
    }
    if (!data.password) {
      errors.password = "Pasword is Required ! ";
    } else if (data.password.length < 4) {
      errors.password = "password must be more than 4 characters"
    }

    return errors;
  }

  return (
    <>
    <WelcomeNavbar />
    <Container component="main" maxWidth="xs">
      {/* {Object.keys(formErrors).length === 0 && isSubmit && (
                )} */}
   
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <InputLabel >
            User Name
      </InputLabel>
              <Input
               sx={{backgroundColor:'white'}}
                autoComplete="username"
                name="username"
                // variant="outlined"
                required
                fullWidth
                // label="User Name"
                autoFocus
                value={data.username}
                onChange={display}
             
              />
              <small style={{ color: 'red' }} >{formErrors.username}</small>

            </Grid>
            <Grid item xs={12}>
            <InputLabel >
            Email Address
      </InputLabel>
              <Input
                // variant="outlined"
                required
                fullWidth
                // label="Email Address"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={display}

              />
              <small style={{ color: 'red' }} >{formErrors.email}</small>

            </Grid>
            <Grid item xs={12}>
            <InputLabel >
            Password
      </InputLabel>
              <Input
                // variant="outlined"
                required
                fullWidth
                name="password"
               
                type={passwordType==="password"? "password" : "text"}   
                autoComplete="current-password"
                value={data.password}
                onChange={display}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                     
                      onMouseDown={togglePassword}
                    >
                      {passwordType==="text" ? <i className="fas fa-eye-slash"></i> :<i className="fas fa-eye"></i>}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <small style={{ color: 'red' }} >{formErrors.password}</small>

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <ToastContainer
            autoClose={1000}
            position="top-center"
            className="toast-container"
            toastClassName="dark-toast"
            theme="colored" />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/userlogin" variant="body2" style={{textDecoration: 'none', color: 'white'}}>
                Already have an account? LogIn
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>
  );
}