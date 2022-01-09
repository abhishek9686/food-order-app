import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CardContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CardContext);
  const noOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const cartClickHandler = () => {
    props.cartHandler(true);
  };
  return (
    <button onClick={cartClickHandler} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
