import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { GoodsItemForCart, RootState } from "../../types";
import { CartDesktop } from "../page_blocks/cart/cartDesktop";
import { CartMobile } from "../page_blocks/cart/cartMobile";
import { SultanPage } from "../page_blocks/sultanPage";
import { getIndexFromGoodsSortedByBarCode } from "../../utils";
import {
  removeFromCartAllCountAndSaveCartState,
  removeFromCartAndSaveCartState,
  addToCartAndSaveCartState,
  clearCartAndSaveCartState,
} from "../../slices/cartSlice";

export const CartPage = () => {
  const rootState = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const mobileMode = rootState.page.mobileMode;
  const goodsSortedByBarCode = rootState.goods.goodsSortedByBarCode;
  const cartItems = rootState.cart.items;

  const incrementGoodsPositionInCart = (barCode: number) => {
    return () => dispatch(addToCartAndSaveCartState({ barCode, count: 1 }));
  };

  const decrementGoodsPositionInCart = (barCode: number) => {
    return () =>
      dispatch(removeFromCartAndSaveCartState({ barCode, count: 1 }));
  };

  const removeGoodsPositionFromCart = (barCode: number) => {
    return () => dispatch(removeFromCartAllCountAndSaveCartState(barCode));
  };

  let totalGoodsPrice = 0;

  const goodsItemsForCart: GoodsItemForCart[] = cartItems
    .map((item) => {
      const goodsIndex = getIndexFromGoodsSortedByBarCode(
        goodsSortedByBarCode,
        item.barCode
      );
      const goodItem =
        goodsIndex >= 0 ? goodsSortedByBarCode[goodsIndex] : null;
      let totalPrice = 0;
      if (goodItem) {
        totalPrice = item.count * (goodItem?.price as number);

        totalGoodsPrice += totalPrice;
      }

      return {
        ...goodItem,
        count: item.count,
        totalPrice,
      };
    })
    .filter((item) => item) as GoodsItemForCart[];

  const [orderIsProcessed, setValueToOrderIsProcessed] = useState(false);

  const setOrderIsProcessed = () => {
    setValueToOrderIsProcessed(true);
  };

  const unsetOrderIsProcessedAndClearCart = () => {
    dispatch(clearCartAndSaveCartState());
    setValueToOrderIsProcessed(false);
  };

  const CartElement = mobileMode ? CartMobile : CartDesktop;
  const cartBlock = (
    <CartElement
      items={goodsItemsForCart}
      incrementGoodsPositionInCart={incrementGoodsPositionInCart}
      decrementGoodsPositionInCart={decrementGoodsPositionInCart}
      removeGoodsPositionFromCart={removeGoodsPositionFromCart}
      totalPrice={totalGoodsPrice}
      setOrderIsProcessed={setOrderIsProcessed}
    />
  );

  useEffect(() => {
    orderIsProcessed
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  });

  const breadCrumbs = [
    { text: "Каталог", href: "/catalog" },
    { text: "Корзина" },
  ];

  return (
    <>
      {orderIsProcessed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            backgroundColor: "rgba(68, 68, 68, 0.15)",
          }}
        >
          <button
            onClick={unsetOrderIsProcessedAndClearCart}
            style={{
              fontSize: "inherit",
              backgroundColor: "#fff",
              padding: "40px 40px",
              borderRadius: 30,
              cursor: "pointer",
            }}
          >
            Заказ оформлен...
          </button>
        </div>
      )}
      <SultanPage
        mainBlock={cartBlock}
        sortBlock={null}
        pageTitle="Корзина"
        breadCrumbs={breadCrumbs}
      />
    </>
  );
};
