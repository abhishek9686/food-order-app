import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CardContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnIsFocused, setBtntoFocus] = useState(false);
  const cartCtx = useContext(CardContext);
  const { items } = cartCtx;
  const noOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${btnIsFocused ? classes.bump : ""}`;

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
