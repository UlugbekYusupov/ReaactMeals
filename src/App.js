import React, { useContext, useState } from 'react'
import Cart from './components/Carts/Cart/Cart'
import AuthContext from './store/auth-context';
import Header from "./components/Layout/Header/Header";
import Meals from './components/Meals/Meals';
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login'

import { Switch, Route, Redirect } from 'react-router-dom'

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
          {!loginCtx.isLoggedIn && <Route path='/login' exact component={Login} />}
          {!loginCtx.isLoggedIn && <Route path='/signup' exact component={SignUp} />}
        
          <Route path='*'>
            <Redirect to="/" />
          </Route>

        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
