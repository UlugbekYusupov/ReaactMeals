import React, { useContext } from "react";
import mealsImage from "../../../assets/meals.jpg";
import AuthContext from "../../../store/auth-context";
import HeaderCartButton from "../HeaderCart/HeaderCartButton";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

function Header(props) {
  const loginCtx = useContext(AuthContext);

  const logoutHandler = () => {
    loginCtx.logout()
  }

  const loginHandler = () => {
    loginCtx.login()
  }

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Reactt Meals</h1>
        <div className={classes.innerDiv}>
         
          {!loginCtx.isLoggedIn && (
            <button className={classes.button} onClick={loginHandler}>
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
            </button>
          )}

          {!loginCtx.isLoggedIn && (
            <button className={classes.button}>
              <Link to="/signup" style={{ color: "white" }}>
                Register
              </Link>
            </button>
          )}

          {loginCtx.isLoggedIn && (
            <HeaderCartButton onClick={props.onShowCart} />
          )}
          <div style={{ display: 'flex', marginLeft: '100px' }}>
            {loginCtx.isLoggedIn && (
              <button className={classes.button} onClick={logoutHandler}>
                <span className={classes.icon}>
                  <ExitToAppRoundedIcon />
                </span>
                <Link to='/logout' style={{ color: 'white' }}></Link>
              </button>
            )}
            {loginCtx.isLoggedIn && (
              <button className={classes.button}>
                <Link style={{ color: 'white' }} to='/profile'>Profile</Link>
              </button>
            )}
          </div>

        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </React.Fragment>
  );
}

export default Header;
