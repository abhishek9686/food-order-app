import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useSelector } from 'react-redux';
const HeaderCartButton = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const [btnIsFocused, setBtntoFocus] = useState(false);

  const items = Object.values(cartItems);
  const noOfCartItems = Object.keys(cartItems).length;
  const btnClasses = `${classes.button} ${btnIsFocused ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtntoFocus(true);
    const timer = setTimeout(() => {
      setBtntoFocus(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const cartClickHandler = () => {
    props.cartHandler(true);
  };
  return (
    <button onClick={cartClickHandler} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
