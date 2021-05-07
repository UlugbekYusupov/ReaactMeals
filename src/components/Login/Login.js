import React, { useRef, useState, useContext } from 'react';

import {
  CircularProgress, Avatar, CssBaseline, TextField, FormControlLabel, Checkbox,
  Grid, Box, Typography, makeStyles, Container
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '../Layout/Button/Button'
import AuthContext from '../../store/auth-context';
import Modal from '../UI/Modal/Modal'
import { Link, useHistory } from 'react-router-dom'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        React Meals
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    padding: '20px',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#8a2b06',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(4, 0, 4),
    width: '100%'
  },
}));

export default function Login() {
  const classes = useStyles();

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const authCtx = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    setIsLoading(true)
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOrGEVcJp7D4lrsrsgv8Y7Ap2wbniHwzw'
    fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      setIsLoading(false)
      if (res.ok) {
        return res.json()
      }
      else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
          }
          throw new Error(errorMessage)
        })
      }
    }).then(data => {
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
      authCtx.login(data.idToken, expirationTime.toISOString())
      history.replace('/')
    }).catch(err => {
      alert(err.message)
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && (
        <Modal >
          <CircularProgress color="inherit" />
        </Modal>
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            inputRef={emailInputRef}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordInputRef}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" inputProps={{ "aria-label": "primary checkbox" }}
            />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            className={classes.submit}
          > Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link style={{ color: 'black' }} to="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
