import React, { useState ,useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockIcon from '@mui/icons-material/Lock';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import { userlogin } from "../../../../Api/Config";
import WelcomeNavbar from "../../../../UserPanel/Usercomponent/Welcomepage/WelcomeNavbar";
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


export default function UserLogIn() {

  const userlogintoast = () => {
    toast.success("Login Successfully !")
  };
  let Navigate = useNavigate();
  const classes = useStyles();
  let [formErrors, setformErrors] = useState({});
  let [isSubmit, setIsSubmit] = useState(false);
  let [data, updateData] = useState({ username: '', email: '', password: '' });
  const display = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    logInApi();
    setformErrors(validate(data));
    setIsSubmit(true);
  };
  const logInApi = () => {
    axios(
      {
        url: `${userlogin}`,
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
        localStorage.setItem('userlogintoken', userlogintoken)          
            if (response.status === 200) {
              userlogintoast();
              setTimeout(() => {
                Navigate('/Home')
              }, 1000)
            }        
      })
      .catch((err) => {
        console.log(err);

      })
  }
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  });
  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is Required ! ";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email formate"
    }
    if (!values.password) {
      errors.password = "Pasword is Required ! ";
    } else if (values.password < 6) {
      errors.password = "password must be more than 6 characters"
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
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={display}
              />
              <p style={{ color: 'red' }} >{formErrors.email}</p>

            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={data.password}
                onChange={display}

              />
              <p style={{ color: 'red' }} >{formErrors.password}</p>

            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
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
          <Grid container justify="flex-end">
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














// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// // import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from "axios";
// import { useNavigate , Link} from "react-router-dom";
// import { userlogin } from "../../../../Api/Config";
// import {useEffect , useState} from 'react'

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function UserLogIn() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };
//   let Navigate = useNavigate();
//   // const classes = useStyles();
//   let [formErrors, setformErrors] = useState({});
//   let [isSubmit, setIsSubmit] = useState(false);
//   let [data, updateData] = useState({ username: '', email: '', password: '' });
//   const display = (e) => {
//     updateData({ ...data, [e.target.name]: e.target.value });
//   };
//   const submit = (e) => {
//     e.preventDefault();
//     logInApi();
//     setformErrors(validate(data));
//     setIsSubmit(true);
//   };
//   const logInApi = () => {
//     axios(
//       {
//         url: `${userlogin}`,
//         method: "post",
//         header: {
//           'Content-Type': 'application/json'
//         },
//         data: {
//           email: data.email,
//           password: data.password
//         }
//       }
//     )
//       .then((response) => {
//         console.log(response);
//         if (response.status === 200) {
//           const userlogintoken = response.data.token
//           console.log(response.data.token)
//           localStorage.setItem('userlogintoken', userlogintoken)
//             // window.location.href="/home";
//             Navigate('/Home')
//         }
//       })
//       .catch((err) => {
//         console.log(err);

//       })
//   }
//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//     }
//   });
//   const validate = (values) => {
//     const errors = {}
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!values.email) {
//       errors.email = "Email is Required ! ";
//     } else if (!regex.test(values.email)) {
//       errors.email = "This is not a valid email formate"
//     }
//     if (!values.password) {
//       errors.password = "Pasword is Required ! ";
//     } else if (values.password < 6) {
//       errors.password = "password must be more than 6 characters"
//     }

//     return errors;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Log In
//             </Button>
//             <Grid container>
//               {/* <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid> */}
//               <Grid item>
//                 <Link to="/" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }


