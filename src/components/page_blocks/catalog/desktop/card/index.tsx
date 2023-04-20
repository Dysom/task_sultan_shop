import { Link } from "react-router-dom";
import { GoodsItemForCatalog, ItemQuantityType } from "../../../../../types";
import { getPreviewImagePath } from "../../../../../utils";
import { AddToCartButton } from "../../addToCartButton";
import {
  layout_icons_ico_volume_svg,
  layout_icons_ico_weight_svg,
} from "../../../../../images";

type CardProps = {
  item: GoodsItemForCatalog;
  addToCart: any;
};

export const Card = ({ item, addToCart }: CardProps) => {
  return (
    <div className="catalog__card catalog-card">
      <div className="catalog-card__picture">
        <Link to={"/catalog/" + item.barCode}>
          <img src={getPreviewImagePath(item.imageUrl)} alt={item.name} />
        </Link>
      </div>
      <div className="catalog-card__quantity-type">
        {item.quantityType === ItemQuantityType.Volume ? (
          <img src={layout_icons_ico_volume_svg} alt="volume" />
        ) : (
          <img src={layout_icons_ico_weight_svg} alt="weight" />
        )}{" "}
        {item.quantity}{" "}
        {item.quantityType === ItemQuantityType.Volume ? "мл" : "г"}
      </div>
      <div className="catalog-card__name">
        <Link to={"/catalog/" + item.barCode}>{item.name}</Link>
      </div>
      <div className="catalog-card__item">
        Штрихкод:{" "}
        <span className="catalog-card__item-value">{item.barCode}</span>
      </div>
      <div className="catalog-card__item">
        Производитель:{" "}
        <span className="catalog-card__item-value">{item.manufacturer}</span>
      </div>
      <div className="catalog-card__item">
        Бренд: <span className="catalog-card__item-value">{item.brand}</span>
      </div>
      <div className="catalog-card__main">
        <span className="catalog-card__price">{item.price} &#8376;</span>
        <AddToCartButton alreadyInCart={item.inCart} onClick={addToCart} />
      </div>
    </div>
  );
};
