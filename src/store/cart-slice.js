import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: {},
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      console.log('ADD ITEM: ', action.payload.data);
      if (state.items.hasOwnProperty(action.payload.data.id)) {
        let existingItem = state.items[action.payload.data.id];
        existingItem.amount = existingItem.amount + action.payload.data.amount;
      } else {
        state.items[action.payload.data.id] = action.payload.data;
      }
      state.totalAmount =
        state.totalAmount +
        action.payload.data.amount * action.payload.data.price;
    },
    removeItem(state, action) {
      console.log('REMOVE ITEM: ', action.payload.data);
      console.log('CART ITEMS STATE: ', state.items);
      if (state.items.hasOwnProperty(action.payload.data.id)) {
        let cartItem = state.items[action.payload.data.id];
        cartItem.amount--;
        state.items[action.payload.data.id] = cartItem;
        state.totalAmount = state.totalAmount - cartItem.price;
        if (cartItem.amount === 0) {
          delete state.items[action.payload.data.id];
        }
      }
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
