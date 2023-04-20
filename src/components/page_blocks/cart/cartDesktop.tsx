import {
  layout_icons_ico_trash_white_svg,
  layout_icons_ico_volume_svg,
  layout_icons_ico_weight_svg,
} from "../../../images";
import { GoodsItemForCart, ItemQuantityType } from "../../../types";
import { formatPrice, getPreviewImagePath } from "../../../utils";

type PropsType = {
  items: GoodsItemForCart[];
  incrementGoodsPositionInCart: any;
  decrementGoodsPositionInCart: any;
  removeGoodsPositionFromCart: any;
  totalPrice: number;
  setOrderIsProcessed: any;
};

export const CartDesktop = (props: PropsType) => {
  return (
    <div className="main__main-box">
      {props.items.length > 0 ? (
        <div className="cart">
          {props.items.map((goodsItem) => {
            return (
              <div
                key={"cart-item_" + goodsItem.barCode}
                className="cart__item cart-item"
              >
                <div className="cart-item__image-wrapper">
                  <img
                    src={getPreviewImagePath(goodsItem.imageUrl)}
                    alt="goods"
                  />
                </div>
                <div className="cart-item__content">
                  <div className="cart-item__quantity">
                    {goodsItem.quantityType === ItemQuantityType.Volume ? (
                      <img src={layout_icons_ico_volume_svg} alt="volume" />
                    ) : (
                      <img src={layout_icons_ico_weight_svg} alt="weight" />
                    )}{" "}
                    {goodsItem.quantity}{" "}
                    {goodsItem.quantityType === ItemQuantityType.Volume
                      ? "мл"
                      : "г"}
                  </div>
                  <div className="cart-item__name">{goodsItem.name}</div>
                  <div className="cart-item__description">
                    {goodsItem.description}
                  </div>
                </div>
                <div className="cart-item__options-box">
                  <div className="cart-item__splitter"></div>
                  <div className="cart-item__count">
                    <button
                      className="cart-item__change-count field-operator"
                      onClick={props.decrementGoodsPositionInCart(
                        goodsItem.barCode
                      )}
                    >
                      -
                    </button>
                    <span className="cart-item__count-value">
                      {goodsItem.count}
                    </span>
                    <button
                      className="cart-item__change-count field-operator"
                      onClick={props.incrementGoodsPositionInCart(
                        goodsItem.barCode
                      )}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item__splitter"></div>
                  <div className="cart-item__price cart-item-price">
                    {formatPrice(goodsItem.totalPrice)} &#8376;
                  </div>
                  <div className="cart-item__splitter"></div>
                  <div className="cart-item__remove">
                    <button
                      className="field-button field-button_circle"
                      onClick={props.removeGoodsPositionFromCart(
                        goodsItem.barCode
                      )}
                    >
                      <img src={layout_icons_ico_trash_white_svg} alt="clear" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="cart__bottom">
            <button
              className="field-button"
              onClick={props.setOrderIsProcessed}
            >
              Оформить
            </button>
            <div className="cart-item-price">
              {formatPrice(props.totalPrice)} &#8376;
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-is-empty">Корзина пуста</div>
        </>
      )}
    </div>
  );
};
