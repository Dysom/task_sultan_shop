import { Link } from "react-router-dom";
import {
  layout_icons_ico_catalog_svg,
  layout_icons_ico_menu_white_svg,
  layout_icons_ico_search_svg,
  layout_logo_sultan_svg,
} from "../../../images";

type HeaderProps = {
  cartGoodsCount: number;
};

export const HeaderMobile = (props: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__wrapper body-wrapper">
        <div className="header__top">
          <div className="header__top-item">
            <button className="header__button header__button_yellow">
              <img src={layout_icons_ico_menu_white_svg} alt="menu" />
            </button>
          </div>
          <div className="header__top-item">
            <a href="/" className="header__logo">
              <img
                src={layout_logo_sultan_svg}
                alt="sultan"
                className="header__logo-img"
              />
            </a>
          </div>
          <div className="header__top-item">
            <Link to="/cart" className="header__cart">
              <div className="header__cart-count">{props.cartGoodsCount}</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="header__lines">
        <div className="header__wrapper body-wrapper">
          <div className="header__bottom header-bottom">
            <div className="header__bottom-item">
              <a href="/" className="header-bottom__item-link">
                <img src={layout_icons_ico_catalog_svg} alt="catalog" />
                Каталог
              </a>
            </div>
            <div className="header__bottom-item">
              <a href="/" className="header-bottom__item-link">
                <img src={layout_icons_ico_search_svg} alt="search" />
                Поиск
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
