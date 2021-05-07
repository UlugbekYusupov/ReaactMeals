import React, { useContext, useState, useEffect } from 'react'
import Cart from './components/Carts/Cart/Cart'
import AuthContext from './store/auth-context';
import Header from "./components/Layout/Header/Header";
import Meals from './components/Meals/Meals';
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login'
import Profile from './components/Proflie'

import { Switch, Route, Redirect } from 'react-router-dom'
import ForgotPassword from './components/ForgotPassword';

function App() {

  const [cartIsShown, setCartIsShown] = useState(false)
  const loginCtx = useContext(AuthContext)
  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandleer = () => {
    setCartIsShown(false)
  }

  return (
    <React.Fragment>
      {cartIsShown && <Cart onClose={hideCartHandleer} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Switch>
          <Route path='/' exact component={Meals} />
          {!loginCtx.token && <Route path='/login' exact component={Login} />}
          {!loginCtx.isLoggedIn && <Route path='/signup' exact component={SignUp} />}
          {loginCtx.token && <Route path='/profile' exact component={Profile} />}
          <Route path='/forgotPassword' exact component={ForgotPassword} />
          <Route path='*'>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
