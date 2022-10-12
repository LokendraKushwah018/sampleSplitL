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
        if (response.status === 200) {
          const userlogintoken = response.data.token
          console.log(response.data.token)
          localStorage.setItem('userlogintoken', userlogintoken)
            // window.location.href="/home";
            Navigate('/Home')
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Don't have an account? SignUp
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}