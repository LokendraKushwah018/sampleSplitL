import React, { useState, useEffect } from "react";
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


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

  const createnew = () => {
    toast.success('New Password Successfully Updated')
  }

  

const Userresetpassword = () => {
    const [createdata, setCreateData] = useState({email: '' , password: '' , confirmation_password: ''})
    const classes = useStyles();
    const Navigate = useNavigate();
const data = (e) => {
    setCreateData({...createdata, [e.target.name]: e.target.value})
}

const update = (e) => {
    e.preventDefault()
    axios.put('http://43.205.187.52:5001/api/admin/resetPassword',createdata)
.then((Response)=> {
    console.log(Response)
    if(Response.status === 200){
        createnew()
        setTimeout(()=> {
            Navigate('/userlogin')
        },2000)
    }
    
}).catch((error) => {
    console.log(error)
})

}
  return (
    <div>
        <ToastContainer
              autoClose={1000}
              position="top-center"
              className="toast-container"
              toastClassName="dark-toast"
              theme="colored" />
         <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Reset Password
          </Typography>
          <form className={classes.form}  noValidate onSubmit={update}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps=
                  {{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  className={classes.multilineColor}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={createdata.email}
                  onChange={data}
                  />               
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps=
                  {{
                    className: classes.floatingLabelFocusStyle,            
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  className={classes.input} 
                  value={createdata.password}
                  onChange={data}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps=
                  {{
                    className: classes.floatingLabelFocusStyle,            
                  }}
                  required
                  fullWidth
                  name="confirmation_password"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  className={classes.input} 
                  value={createdata.confirmation_password}
                  onChange={data}
                  />
              </Grid>
            </Grid><br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Create
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
    </div>
  )
}

export default Userresetpassword
