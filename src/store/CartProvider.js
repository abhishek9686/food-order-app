import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  let updatedItems;
  if (action.type === "ADD_ITEM") {
    console.log("ITEMS: ", state.items);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmt =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmt,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    console.log("REMOVE ITEM: ", action);

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log("EXIS IND: ", existingCartItemIndex);
    const existingCartItem = state.items[existingCartItemIndex];
    if (existingCartItemIndex >= 0) {
      updatedItems = [...state.items];

      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      console.log("ALL ITEMS: ", updatedItems);
      console.log("UPDATED ITEM: ", updatedItem);

      if (updatedItem.amount === 0) {
        console.log("hreee");
        updatedItems = updatedItems.filter((item) => item.id !== action.id);
        console.log(" hreee ALL ITEMS: ", updatedItems);
      } else {
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      const updatedTotalAmt = state.totalAmount - existingCartItem.price;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmt,
      };
    }
  }
  return state;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
