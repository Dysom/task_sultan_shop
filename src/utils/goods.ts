import type { GoodsItem } from "../types";
import { defaultGoods } from "../data/defaultGoods";
import { store } from "../store";
import { getObjectCopy } from ".";

const GOODS_STORAGE_NAME = "goods_state";

export const saveGoodsToLocalStorage = (goods: Array<GoodsItem>) => {
  try {
    const goodsStringState = JSON.stringify(goods);
    localStorage.setItem(GOODS_STORAGE_NAME, goodsStringState);
  } catch (error) {
    console.log(error);
  }
};

export const loadGoodsFromLocalStorage = (): Array<GoodsItem> => {
  try {
    const goodsStringState = localStorage.getItem(GOODS_STORAGE_NAME);

    if (goodsStringState === null) {
      throw new Error("state is null");
    }

    return JSON.parse(goodsStringState);
  } catch (err) {
    return [];
  }
};

export const loadDefaultGoods = (): Array<GoodsItem> => {
  return getObjectCopy(defaultGoods);
};

export const saveChangesToLocalStorage = () =>
  saveGoodsToLocalStorage(store.getState().goods.goodsSortedByBarCode);
