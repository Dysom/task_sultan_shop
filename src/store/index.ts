import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "../slices/pageSlice";
import goodsSlice from "../slices/goodsSlice";
import adminSlice from "../slices/adminSlice";
import catalogPageSlice from "../slices/catalogSlice";
import cartSlice from "../slices/cartSlice";

export const store = configureStore({
  reducer: {
    page: pageSlice,
    goods: goodsSlice,
    catalogPage: catalogPageSlice,
    cart: cartSlice,
    adminPage: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
