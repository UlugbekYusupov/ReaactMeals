import React, { useRef, useState } from 'react';
import { Avatar, CssBaseline, TextField, Grid, Typography, makeStyles, Container } from '@material-ui/core';
import Button from '../Layout/Button/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    padding: '20px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#8a2b06',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
    width: '100%'
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const firstNameInputRef = useRef()
  const lastNameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const telNumberInputRef = useRef()
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredFirstName = firstNameInputRef.current.value
    const enteredLastName = lastNameInputRef.current.value
    const enteredTelNumber = telNumberInputRef.current.value

    setIsLoading(true)
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOrGEVcJp7D4lrsrsgv8Y7Ap2wbniHwzw'
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
      history.goBack()
      //saving user sign up data into the firebase
      fetch(
        'https://food-order-38f3a-default-rtdb.firebaseio.com/users.json',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            telNumber: enteredTelNumber
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }).catch(err => {
      alert(err.message)
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={firstNameInputRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={lastNameInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="telephone"
                label="Telephone"
                type="number"
                id="telephone"
                inputRef={telNumberInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordInputRef}
              />
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={30}> */}
      {/* <footer><Copyright /></footer> */}
      {/* </Box> */}
    </Container>
  );
}