import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../utils/cart";

type CartItemType = {
  barCode: number;
  count: number;
};

export interface CartState {
  items: CartItemType[];
  orderIsProcessed: boolean;
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
  orderIsProcessed: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAndSaveCartState: (
      state,
      { payload }: PayloadAction<CartItemType>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.barCode === payload.barCode
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].count += payload.count;
      } else {
        state.items.push({ barCode: payload.barCode, count: payload.count });
      }

      saveCartToLocalStorage(state.items);
    },
    removeFromCartAndSaveCartState: (
      state,
      { payload }: PayloadAction<CartItemType>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.barCode === payload.barCode
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].count -= payload.count;

        if (state.items[itemIndex].count < 1) {
          state.items.splice(itemIndex, 1);
        }
      }

      saveCartToLocalStorage(state.items);
    },
    removeFromCartAllCountAndSaveCartState: (
      state,
      { payload: barCode }: PayloadAction<number>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.barCode === barCode
      );

      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
      }

      saveCartToLocalStorage(state.items);
    },
    clearCartAndSaveCartState: (state) => {
      state.items = [];

      saveCartToLocalStorage(state.items);
    },
    // setOrderIsProcessed: (state) => {
    //   state.orderIsProcessed = true;
    // },
    // unsetOrderIsProcessed: (state) => {
    //   state.orderIsProcessed = false;
    // },
  },
});

export const {
  addToCartAndSaveCartState,
  removeFromCartAndSaveCartState,
  removeFromCartAllCountAndSaveCartState,
  clearCartAndSaveCartState,
  // setOrderIsProcessed,
  // unsetOrderIsProcessed,
} = cartSlice.actions;

export default cartSlice.reducer;
