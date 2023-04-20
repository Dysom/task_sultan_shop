import { Link } from "react-router-dom";
import { layout_icons_ico_cart_white_svg } from "../../../../images";

type PropsType = {
  alreadyInCart: boolean;
  onClick: any;
};

export const AddToCartButton = ({ alreadyInCart, onClick }: PropsType) => {
  return (
    <>
      {alreadyInCart ? (
        <Link to="/cart" className="catalogCard__already-in-cart">
          Товар в корзине
        </Link>
      ) : (
        <button
          className="catalog-card__add-to-card-button field-button field-button_add-to-card"
          onClick={onClick}
        >
          В КОРЗИНУ{" "}
          <img src={layout_icons_ico_cart_white_svg} alt="add-to-card" />
        </button>
      )}
    </>
  );
};
