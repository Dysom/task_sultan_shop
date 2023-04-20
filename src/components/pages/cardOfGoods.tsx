import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { GoodsItem, GoodsItemForCart, RootState } from "../../types";
import { SultanPage } from "../page_blocks/sultanPage";
import { binarySearchIndex, getTypesOfCare } from "../../utils";
import { CardOfGoodsMobile } from "../page_blocks/cardOfGoods/CardOfGoodsMobile";
import { CardOfGoodsDesktop } from "../page_blocks/cardOfGoods/CardOfGoodsDesktop";
import {
  addToCartAndSaveCartState,
  removeFromCartAndSaveCartState,
} from "../../slices/cartSlice";

export const CardOfGoodsPage = (props: any) => {
  const { barcode } = useParams();

  const rootState = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const goodsSortedByBarCode = rootState.goods.goodsSortedByBarCode;

  const goodsIndex = binarySearchIndex(
    goodsSortedByBarCode,
    parseInt(barcode as string),
    (item: GoodsItem) => item.barCode
  );

  const [descriptionCollapsed, setDesriptionCollapsed] = useState(true);
  const [characteristicsCollapsed, setCharacteristicsCollapsed] =
    useState(true);

  if (goodsIndex < 0) {
    return (
      <SultanPage
        breadCrumbs={[]}
        sortBlock={null}
        pageTitle={barcode as string}
        mainBlock={
          <div
            style={{
              padding: "20px 20px 40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
            }}
          >
            Данного товара не существует
          </div>
        }
      />
    );
  }

  const cartItems = rootState.cart.items;

  const goodsItem: GoodsItemForCart = {
    ...goodsSortedByBarCode[goodsIndex],
    totalPrice: 0,
    count: 0,
  };

  const cartItem = cartItems.find((item) => item.barCode === goodsItem.barCode);

  if (cartItem) {
    goodsItem.count = cartItem.count;
    goodsItem.totalPrice = goodsItem.price * cartItem.count;
  }

  const mobileMode = rootState.page.mobileMode;

  const incrementInCart = () => {
    dispatch(
      addToCartAndSaveCartState({ barCode: goodsItem.barCode, count: 1 })
    );
  };
  const decrementInCart = () => {
    dispatch(
      removeFromCartAndSaveCartState({ barCode: goodsItem.barCode, count: 1 })
    );
  };

  const typesOfCare = getTypesOfCare() as string[];

  const typesOfCareString =
    goodsItem.typesOfCare && goodsItem.typesOfCare.length > 0
      ? goodsItem.typesOfCare.map((item) => typesOfCare[item]).join(", ")
      : "";

  const CardOfGoodsElement = mobileMode
    ? CardOfGoodsMobile
    : CardOfGoodsDesktop;

  const cardOfGoodsBlock = (
    <CardOfGoodsElement
      item={goodsItem}
      descriptionCollapsed={descriptionCollapsed}
      characteristicsCollapsed={characteristicsCollapsed}
      setDesriptionCollapsed={setDesriptionCollapsed}
      setCharacteristicsCollapsed={setCharacteristicsCollapsed}
      incrementInCart={incrementInCart}
      decrementInCart={decrementInCart}
      typesOfCareString={typesOfCareString}
    />
  );

  const breadCrumbs = [
    { text: "Каталог", href: "/catalog" },
    { text: goodsItem.name },
  ];

  return (
    <>
      {/* <h1>barcode: {barcode}</h1>         */}
      <SultanPage
        mainBlock={cardOfGoodsBlock}
        pageTitle={goodsItem.name}
        breadCrumbs={breadCrumbs}
        sortBlock={null}
      />
    </>
  );
};
