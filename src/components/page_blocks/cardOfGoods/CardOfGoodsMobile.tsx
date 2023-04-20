import {
  layout_icons_ico_cart_white_svg,
  layout_icons_ico_download_svg,
  layout_icons_ico_graph_svg,
  layout_icons_ico_volume_svg,
  layout_icons_ico_weight_svg,
} from "../../../images";
import { GoodsItemForCart, ItemQuantityType } from "../../../types";
import { formatPrice, getPreviewImagePath } from "../../../utils";

type PropsType = {
  item: GoodsItemForCart;
  descriptionCollapsed: boolean;
  characteristicsCollapsed: boolean;
  setDesriptionCollapsed: any;
  setCharacteristicsCollapsed: any;
  incrementInCart: any;
  decrementInCart: any;
  typesOfCareString: string;
};

export const CardOfGoodsMobile = (props: PropsType) => {
  const item = props.item;

  return (
    <div className="main__card-of-goods">
      <div className="card-of-goods">
        <div className="card-of-goods__image-wrapper">
          <img src={getPreviewImagePath(item.imageUrl)} alt={item.name} />
        </div>
        <div className="card-of-goods__content goods-content">
          <div className="goods-content__stock">В наличии</div>
          <div className="goods-content__name">{item.name}</div>
          <div className="goods-content__quantity">
            {item.quantityType === ItemQuantityType.Volume ? (
              <img src={layout_icons_ico_volume_svg} alt="volume" />
            ) : (
              <img src={layout_icons_ico_weight_svg} alt="weight" />
            )}{" "}
            {item.quantity}{" "}
            {item.quantityType === ItemQuantityType.Volume ? "мл" : "г"}
          </div>
          <div className="goods-content__options-box">
            <div className="goods-content__price">
              {formatPrice(item.count ? item.totalPrice : item.price)} &#8376;
            </div>
            {item.count > 0 && (
              <div className="option-count">
                <div className="field-operator" onClick={props.decrementInCart}>
                  -
                </div>
                <div className="field-value-between">{item.count}</div>
                <div className="field-operator" onClick={props.incrementInCart}>
                  +
                </div>
              </div>
            )}
          </div>
          <div className="goods-content__options-box">
            {item.count < 1 && (
              <button
                onClick={props.incrementInCart}
                className="field-button field-button_add-to-card"
              >
                В КОРЗИНУ{" "}
                <img src={layout_icons_ico_cart_white_svg} alt="add-to-card" />
              </button>
            )}
            <img
              className="goods-content__graph-img"
              src={layout_icons_ico_graph_svg}
              alt="ico"
            />
          </div>
          <div className="goods-content__promo">
            <div className="goods-content__promo-action">
              При покупке от 10 000 &#8376; бесплатная доставка по Кокчетаву и
              области
            </div>
            <div className="goods-content__promo-download">
              Прайс лист{" "}
              <img src={layout_icons_ico_download_svg} alt="download" />
            </div>
          </div>
          <ul className="goods-content__info">
            <li>
              Производитель: <strong>{item.manufacturer}</strong>
            </li>
            <li>
              Бренд: <strong>{item.brand}</strong>
            </li>
            <li>
              Штрихкод: <strong>{item.barCode}</strong>
            </li>
            <li>
              Назначение: <strong>{props.typesOfCareString}</strong>
            </li>
          </ul>
          <div className="goods-content__collapse-box">
            <div className="goods-content__link-toggle">
              <button
                className={
                  "link-toggle link-toggle_big" +
                  (!props.descriptionCollapsed ? " link-toggle_on" : "")
                }
                onClick={() =>
                  props.setDesriptionCollapsed(!props.descriptionCollapsed)
                }
              >
                Описание
              </button>
            </div>
            {!props.descriptionCollapsed && (
              <div className="goods-content__collapse-text">
                {item.description}
              </div>
            )}
          </div>
          <div className="goods-content__splitter"></div>
          <div className="goods-content__collapse-box">
            <div className="goods-content__link-toggle">
              <button
                className={
                  "link-toggle link-toggle_big" +
                  (!props.characteristicsCollapsed ? " link-toggle_on" : "")
                }
                onClick={() =>
                  props.setCharacteristicsCollapsed(
                    !props.characteristicsCollapsed
                  )
                }
              >
                Характеристики
              </button>
            </div>
            {!props.characteristicsCollapsed && (
              <div className="goods-content__collapse-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                interdum ut justo, vestibulum sagittis iaculis iaculis. Quis
                mattis vulputate feugiat massa vestibulum duis. Faucibus
                consectetur aliquet sed pellentesque consequat consectetur
                congue mauris venenatis. Nunc elit, dignissim sed nulla
                ullamcorper enim, malesuada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
