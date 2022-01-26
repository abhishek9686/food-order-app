import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import CartButton from './HeaderCartButton';
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        {props.login && <CartButton cartHandler={props.cartHandler} />}
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='table full of food' />
      </div>
    </React.Fragment>
  );
};
export default Header;
