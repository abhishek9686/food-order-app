import './App.css';
import Header from './components/Layout/Header';
import React, { useEffect, useState } from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
function App() {
  // TODO := Add - Login page
  const [cartIsShown, setCartIsShown] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isLoginSkipped, setSkippedLogin] = useState(false);
  useEffect(() => {
    const storedLoginInfo = localStorage.getItem('isLoggedIn');
    if (storedLoginInfo === '1') {
      setLogin(true);
    }
  }, []);
  const showAndHideCartHandler = (props) => {
    setCartIsShown(props);
  };
  const loginHandler = (props) => {
    if (props === true) {
      localStorage.setItem('isLoggedIn', '1');
    }
    setLogin(props);
  };
  const skipLoginHandler = (props) => {
    if (props === true) {
      setSkippedLogin(true);
    }
  };
  const logOutHandler = () => {
    setLogin(false);
    localStorage.setItem('isLoggedIn', '0');
  };
  const logInHandler = () => {
    setSkippedLogin(false);
  };
  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };
  const cartLoginHandler = () => {
    setSkippedLogin(false);
  };
  console.log('Skipped: ', isLoginSkipped);
  console.log('isLogin: ', isLogin);
  return (
    <div>
      <Header
        logInHandler={logInHandler}
        login={isLogin}
        showCart={isLogin || isLoginSkipped}
        logout={logOutHandler}
        cartHandler={showAndHideCartHandler}
      />
      {!isLogin && !isLoginSkipped && (
        <Login
          skipLoginHandler={skipLoginHandler}
          loginHandler={loginHandler}
        />
      )}
      {(isLogin || isLoginSkipped) && (
        <div>
          {cartIsShown && (
            <Cart
              login={isLogin}
              loginHandler={cartLoginHandler}
              cartHandler={showAndHideCartHandler}
            />
          )}

          <main>
            <Meals />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
