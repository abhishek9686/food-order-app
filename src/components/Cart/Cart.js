import classes from './Cart.module.css';
import { useContext } from 'react';
import Modal from '../UI/Modal';
import CardItem from './CartItem/CartItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItemsState = useSelector((state) => state.cart.items);
  console.log('CART -----> ', cartItemsState);
  const cartAmt = useSelector((state) => state.cart.totalAmount);
  console.log('CART AMT: ', cartAmt);
  const totalAmt = `$${cartAmt.toFixed(2)}`;
  const hasItems = Object.keys(cartItemsState).length > 0;
  const cardItemRemoveHandler = (id) => {
    dispatch(
      cartActions.removeItem({
        data: { id },
      })
    );
  };
  const cardItemAddHandler = (props) => {
    dispatch(
      cartActions.addItem({
        data: {
          id: props.id,
          name: props.name,
          amount: 1,
          price: props.price,
        },
      })
    );
  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {Object.values(cartItemsState).map((item) => (
        <CardItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cardItemRemoveHandler.bind(null, item.id)}
          onAdd={cardItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const CartVisiblityHandler = () => {
    props.cartHandler(false);
  };
  let buttonMsg = 'Order';
  if (!props.login) {
    buttonMsg = 'Login in to order';
  }
  const checkOutHandler = () => {
    props.loginHandler();
  };
  return (
    <Modal cartHandler={props.cartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmt}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={CartVisiblityHandler}
          className={classes['button--alt']}
        >
          Close
        </button>
        {hasItems && (
          <button onClick={checkOutHandler} className={classes.button}>
            {buttonMsg}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
