import classes from "./Cart.module.css";
import { useContext } from "react";
import CartCtx from "../../store/cart-context";
import Modal from "../UI/Modal";
import CardItem from "./CartItem/CartItem";
const Cart = (props) => {
  const cartCtx = useContext(CartCtx);
  const totalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cardItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cardItemAddHandler = (props) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price,
    });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
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
          className={classes["button--alt"]}
        >
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
