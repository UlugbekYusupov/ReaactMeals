import React, { useContext } from "react";
import mealsImage from "../../../assets/meals.jpg";
import AuthContext from "../../../store/auth-context";
import HeaderCartButton from "../HeaderCart/HeaderCartButton";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Header(props) {
  const loginCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Reactt Meals</h1>
        <div>
          {!loginCtx.isLoggedIn && (
            <Button className={classes.button}>
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
            </Button>
          )}
          <div className={classes.innerDiv}>
            {loginCtx.isLoggedIn && (
              <HeaderCartButton onClick={props.onShowCart} />
            )}
            {loginCtx.isLoggedIn && (
              <Button className={classes.button}>
                <Link style={{ color: "white" }} to="/profile">
                  Profile
                </Link>
              </Button>
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
