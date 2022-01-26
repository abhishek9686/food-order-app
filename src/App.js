import './App.css';
import Header from './components/Layout/Header';
import React, { useState } from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CardProvider from './store/CartProvider';
import Login from './components/Login/Login';
function App() {
  // TODO := Add - Login page
  const [cartIsShown, setCartIsShown] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const showAndHideCartHandler = (props) => {
    setCartIsShown(props);
  };
  const loginHandler = (props) => {
    setLogin(props);
  };
  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };
  return (
    <CardProvider>
      <Header login={isLogin} cartHandler={showAndHideCartHandler} />
      {!isLogin && <Login loginHandler={loginHandler} />}
      {isLogin && (
        <div>
          {cartIsShown && <Cart cartHandler={showAndHideCartHandler} />}

          <main>
            <Meals />
          </main>
        </div>
      )}
    </CardProvider>
  );
}

export default App;
