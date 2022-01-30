import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import CartButton from './HeaderCartButton';
import Button from '../UI/Button';
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Order Food</h1>
        {props.showCart && <CartButton cartHandler={props.cartHandler} />}
        {props.login && props.showCart && (
          <Button onClick={props.logout}>Log Out</Button>
        )}
        {!props.login && props.showCart && (
          <Button onClick={props.logInHandler}>Log In</Button>
        )}
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='table full of food' />
      </div>
    </React.Fragment>
  );
};
export default Header;
