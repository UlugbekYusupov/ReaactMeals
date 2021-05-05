// // import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
// // import Card from '../UI/Card/Card';
// // import classes from './Login.module.css';
// // import Button from './Button/Button';
// // import AuthContext from '../../store/auth-context';
// // import Input from './Input/Login-Input';

// // const emaulReducer = (state, action) => {
// //   if (action.type === 'USER_INPUT') {
// //     return { value: action.val, isValid: action.val.includes('@') }
// //   }
// //   if (action.type === 'INPUT_BLUR') {
// //     return { value: state.value, isValid: state.value.includes('@') }
// //   }
// //   return { value: '', isValid: false }
// // }

// // const passwordReducer = (state, action) => {
// //   if (action.type === 'USER_INPUT') {
// //     return { value: action.val, isValid: action.val.trim().length > 6 }
// //   }
// //   if (action.type === 'INPUT_BLUR') {
// //     return { value: state.value, isValid: state.value.trim().length > 6 }
// //   }
// //   return { value: '', isValid: false }
// // }

// // const Login = (props) => {

// //   const [formIsValid, setFormIsValid] = useState(false);
// //   const [signUp, setSignUp] = useState(false)

// //   const authCtx = useContext(AuthContext)

// //   const [emailState, dispatchEmail] = useReducer(emaulReducer, {
// //     value: '', isValid: null
// //   })
// //   const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
// //     value: '', isValid: null
// //   })

// //   const { isValid: emailIsValid } = emailState
// //   const { isValid: passwordIsValid } = passwordState

// //   const emailInputRef = useRef()
// //   const passwordInputRef = useRef()

// //   useEffect(() => {
// //     const identifier = setTimeout(() => {
// //       console.log("checking form validity")
// //       setFormIsValid(
// //         emailIsValid && passwordIsValid
// //       );
// //     }, 500)
// //     return function cleanup() {
// //       console.log("Cleanup")
// //       clearTimeout(identifier)
// //     }
// //   }, [emailIsValid, passwordIsValid])

// //   const emailChangeHandler = (event) => {
// //     dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
// //   };

// //   const passwordChangeHandler = (event) => {
// //     dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
// //   };

// //   const validateEmailHandler = () => {
// //     dispatchEmail({ type: 'INPUT_BLUR' })
// //   };

// //   const validatePasswordHandler = () => {
// //     dispatchPassword({ type: 'INPUT_BLUR' })
// //   };

// //   const submitHandler = (event) => {
// //     event.preventDefault();
// //     setSignUp(false)
// //     if (formIsValid) {
// //       authCtx.login(emailState.value, passwordState.value);
// //     } else if (!emailIsValid) {
// //       emailInputRef.current.focus()
// //     } else {
// //       passwordInputRef.current.focus()
// //     }
// //   };

// //   const registerHandler = (event) => {
// //     setSignUp(true)
// //   }

// //   return (
// //     <Card className={classes.login}>
// //       <form onSubmit={submitHandler}>
// // <Input
// // id="email"
// // label="E-Mail"
// // isValid={emailIsValid}
// // value={emailState.value}
// // onChange={emailChangeHandler}
// // onBlur={validateEmailHandler}
// // ref={emailInputRef}
// // />
// //         <Input
// //           id="password"
// //           label="Password"
// //           isValid={passwordIsValid}
// //           value={passwordState.value}
// //           onChange={passwordChangeHandler}
// //           onBlur={validatePasswordHandler}
// //           ref={passwordInputRef}
// //         />

// //         {signUp && (
// //           <React.Fragment>
// //             <Input
// //               id="username"
// //               label="Username"
// //             // isValid={passwordIsValid}
// //             // value={passwordState.value}
// //             // onChange={passwordChangeHandler}
// //             // onBlur={validatePasswordHandler}
// //             // ref={passwordInputRef}
// //             />
// //             <Input
// //               id="address"
// //               label="Address"
// //             // isValid={passwordIsValid}
// //             // value={passwordState.value}
// //             // onChange={passwordChangeHandler}
// //             // onBlur={validatePasswordHandler}
// //             // ref={passwordInputRef}
// //             />
// //             <Input
// //               type="number"
// //               id="tel"
// //               label="Telephone"
// //             // isValid={passwordIsValid}
// //             // value={passwordState.value}
// //             // onChange={passwordChangeHandler}
// //             // onBlur={validatePasswordHandler}
// //             // ref={passwordInputRef}
// //             />
// //           </React.Fragment>
// //         )}

// //         <div className={classes.actions}>
// //           <Button type="submit" className={classes.btn}>
// //             Login
// //           </Button>
// //           <Button onClick={registerHandler} className={classes.btn}>
// //             Register
// //           </Button>
// //         </div>
// //       </form>
// //     </Card>
// //   );
// // };

// // export default Login;


// import React, { useState, useRef, useContext } from 'react';
// import AuthContext from '../../store/auth-context'
// import Card from '../UI/Card/Card';
// import Button from './Button/Button'
// import Input from './Input/Login-Input';

// import classes from './Login.module.css';

// const Login = () => {

//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();

//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false)

//   const authCtx = useContext(AuthContext)
//   const [isLogin, setIsLogin] = useState(true);

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     const enteredEmail = emailInputRef.current.value
//     const enteredPassword = passwordInputRef.current.value

//     setIsLoading(true)
//     let url
//     if (isLogin) {
//       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOrGEVcJp7D4lrsrsgv8Y7Ap2wbniHwzw'

//     } else {
//       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOrGEVcJp7D4lrsrsgv8Y7Ap2wbniHwzw'
//     }

//     fetch(
//       url,
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           email: enteredEmail,
//           password: enteredPassword,
//           returnSecureToken: true
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     ).then(res => {
//       setIsLoading(false)
//       if (res.ok) {
//         return res.json()
//       } else {
//         return res.json().then(data => {
//           let errorMessage = 'Authentication failed'
//           if (data && data.error && data.error.message) {
//             errorMessage = data.error.message
//           }
//           throw new Error(errorMessage)
//         })
//       }
//     }).then(data => {
//       authCtx.login(data.idToken)
//     }).catch(err => {
//       alert(err.message)
//     })
//   };

//   return (
//     <Card className={classes.login}>
//       <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//       <form onSubmit={submitHandler}>
//         <Input
//           type="email"
//           id="email"
//           label="E-Mail"
//           ref={emailInputRef}
//         />

//         <Input
//           label="Password"
//           type='password'
//           id='password'
//           required
//           ref={passwordInputRef}
//         />

//         {!isLogin && (
//           <React.Fragment>
//             <Input
//               label="Username"
//               type='text'
//               id='username'
//             />
//             <Input
//               label="Telephone"
//               type='number'
//               id='tel'
//             />
//             <Input
//               label="Address"
//               type='text'
//               id='address'
//             />
//           </React.Fragment>
//         )}
//         {isLoading && <p style={{ textAlign: "center", color: "red" }}>Sending request</p>}

//         <div className={classes.actions}>
//           {!isLoading && <Button type="submit">{isLogin ? 'Login' : 'Create Account'}</Button>}
//           <button
//             type='button'
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? 'Create new account' : 'Login with existing account'}
//           </button>
//         </div>
//       </form>
//     </Card>
//   );
// };

// export default Login;

import React, { useRef, useState, useContext } from 'react';

import {
  CircularProgress, Backdrop, Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Link,
  Grid, Box, Typography, makeStyles, Container
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '../Layout/Button/Button'
import AuthContext from '../../store/auth-context';
import Modal from '../UI/Modal/Modal'

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
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#8a2b06',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(2, 0, 5),
    width: '100%'
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const authCtx = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  const submitHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    setIsLoading(true)
    let url
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOrGEVcJp7D4lrsrsgv8Y7Ap2wbniHwzw'

    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOrGEVcJp7D4lrsrsgv8Y7Ap2wbniHwzw'
    }

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
      authCtx.login(data.idToken)
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={30}>
        <Copyright />
      </Box>
    </Container>
  );
}
