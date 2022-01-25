import './App.css';
import Header from './components/Layout/Header';
import React, { useState } from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CardProvider from './store/CartProvider';
function App() {
  // TODO := Add - Login page
  const [cartIsShown, setCartIsShown] = useState(false);
  const showAndHideCartHandler = (props) => {
    setCartIsShown(props);
  };
  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };
  return (
    <CardProvider>
      {cartIsShown && <Cart cartHandler={showAndHideCartHandler} />}
      <Header cartHandler={showAndHideCartHandler} />
      <main>
        <Meals />
      </main>
    </CardProvider>
  );
}

export default App;
