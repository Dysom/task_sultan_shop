import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { GoodsItem } from "../types";
import { loadGoodsFromLocalStorage, loadDefaultGoods } from "../utils/goods";

const sortGoodsByBarCode = (goods: GoodsItem[]) => {
  goods.sort((itemA, itemB) => itemA.barCode - itemB.barCode);
};

const initialState = {
  goodsSortedByBarCode: loadGoodsFromLocalStorage(),
};

if (initialState.goodsSortedByBarCode.length === 0) {
  initialState.goodsSortedByBarCode = loadDefaultGoods();
}

sortGoodsByBarCode(initialState.goodsSortedByBarCode);

export type GoodsState = typeof initialState;

export const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    deleteGoodsAndSortGoodsArrayIfNeeded: (
      state,
      action: PayloadAction<number>
    ) => {
      state.goodsSortedByBarCode = state.goodsSortedByBarCode.filter(
        (item) => item.barCode !== action.payload
      );

      if (state.goodsSortedByBarCode.length === 0) {
        state.goodsSortedByBarCode = loadDefaultGoods();

        sortGoodsByBarCode(state.goodsSortedByBarCode);
      }
    },
    editGoods: (state, action: PayloadAction<GoodsItem>) => {
      for (let i = 0; i < state.goodsSortedByBarCode.length; i++) {
        if (state.goodsSortedByBarCode[i].barCode === action.payload.barCode)
          state.goodsSortedByBarCode[i] = action.payload;
      }
    },
    createGoodsAndSortGoodsArray: (state, action: PayloadAction<GoodsItem>) => {
      state.goodsSortedByBarCode.push(action.payload);

      sortGoodsByBarCode(state.goodsSortedByBarCode);
    },
  },
});

export const {
  deleteGoodsAndSortGoodsArrayIfNeeded,
  editGoods,
  createGoodsAndSortGoodsArray,
} = goodsSlice.actions;

export default goodsSlice.reducer;
