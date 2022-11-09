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
import axios from "axios";
import {  useNavigate} from "react-router-dom";
import { loginAdmin } from "../../../Api/Config"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { adminlogin } from "../Auth/AdminSlice";

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

export default function AdminlogIn() {
  const logintoast = () => {
    toast.success("Login Successfully !")
  };
//   let history = useHistory();
  let Navigate = useNavigate();
  const dispatch = useDispatch()
  const classes = useStyles();
  let [data, updateData] = useState({ email: '', password: '' });
  const display = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    AdminlogInApi();
    // setformErrors(validate(data));
    // setIsSubmit(true);
  };
    const AdminlogInApi = () => {
      axios(
        {
          url: `${loginAdmin}`,
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
        // localStorage.setItem('logintoken', logintoken)

        if (response.status === 200) {
          logintoast();
          setTimeout(() => {
            Navigate('/dashboard');
          }, 2000)
        }
        })
        .catch((err) => {
          console.log(err);

        })
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
              <TextField
                // variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={display}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={data.password}
                onChange={display}

              />
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
        </form>
      </div>

    </Container>
  );
}