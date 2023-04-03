import { createSlice, configureStore } from "@reduxjs/toolkit";
import { CartItemModel } from "../components/Cart/types";
import { IRootState } from "./types";

const defaultState: IRootState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItem(state, { payload }: { payload: CartItemModel }) {
      console.log(payload);
      const newItem = payload;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        state.items[existingCartItemIndex].amount++;
      } else {
        state.items.push(newItem);
      }

      state.totalAmount += newItem.price;
    },
    removeItem(state, { payload }) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === payload.id
      );
      const existingItem = state.items[existingCartItemIndex];
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== payload.id);
      } else {
        state.items[existingCartItemIndex].amount--;
      }
      state.totalAmount -= existingItem.price;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

const store = configureStore({
  reducer: cartSlice.reducer,
});

export default store;
