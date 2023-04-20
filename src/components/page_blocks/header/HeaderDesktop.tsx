import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils";
import {
  layout_header_feedback_picture_png,
  layout_icons_ico_catalog_white_svg,
  layout_icons_ico_download_white_svg,
  layout_icons_ico_locate_svg,
  layout_icons_ico_mail_svg,
  layout_icons_ico_search_white_svg,
  layout_logo_sultan_svg,
} from "../../../images";

type HeaderProps = {
  cartGoodsCount: number;
  cartTotalPrice: number;
};

export const HeaderDesktop = (props: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__wrapper body-wrapper">
        <div className="header__top">
          <div className="header__top-block">
            <img
              src={layout_icons_ico_locate_svg}
              alt="locate"
              className="header__block-image"
            />
            <div className="header__address">
              г. Кокчетав, ул. Ж. Ташенова 129Б
              <br />
              <span className="header__subtext">(Рынок Восточный)</span>
            </div>
          </div>
          <div className="header__top-block">
            <img
              src={layout_icons_ico_mail_svg}
              alt="mail"
              className="header__block-image"
            />
            <div className="header__mail">
              opt.sultan@mail.ru
              <br />
              <span className="header__subtext">На связи в любое время</span>
            </div>
          </div>
          <nav className="header__nav header-nav">
            <a href="/" className="header-nav__link">
              О компании
            </a>
            <a href="/" className="header-nav__link">
              Доставка и оплата
            </a>
            <a href="/" className="header-nav__link">
              Возврат
            </a>
            <a href="/" className="header-nav__link">
              Контакты
            </a>
          </nav>
        </div>
      </div>
      <div className="header__lines">
        <div className="header__wrapper body-wrapper">
          <div className="header__bottom">
            <div className="header__logo">
              <a href="/">
                <img
                  src={layout_logo_sultan_svg}
                  alt="sultan"
                  className="header__logo-img"
                />
              </a>
            </div>
            <div className="header__bottom-block header__bottom-block_catalog">
              <button className="header__button header__button_yellow">
                Каталог
                <img src={layout_icons_ico_catalog_white_svg} alt="catalog" />
              </button>
            </div>
            <div className="header__bottom-block header__bottom-block_search">
              <div className="header__search-field">
                <input type="text" placeholder="Поиск..." />
                <button>
                  <img src={layout_icons_ico_search_white_svg} alt="search" />
                </button>
              </div>
            </div>
            <div className="header__feedback header-feedback">
              <div className="header-feedback__text-block">
                <div className="header-feedback__phone">+7 (777) 490-00-91</div>
                <div className="header-feedback__worktime">
                  время работы: 9:00-20:00
                </div>
                <div className="header-feedback__order-call">
                  <a href="/">Заказать звонок</a>
                </div>
              </div>
              <img
                src={layout_header_feedback_picture_png}
                alt="recall"
                className="header-feedback__image"
              />
            </div>
            <div className="header__bottom-block header__bottom-block_price-list">
              <button className="header__button header__button_yellow">
                Прайс-лист
                <img src={layout_icons_ico_download_white_svg} alt="download" />
              </button>
            </div>
            <Link to="/cart" className="header__cart">
              <div className="header__cart-text">
                Корзина
                <br />
                <span className="header__cart-price">
                  {formatPrice(props.cartTotalPrice)} &#8376;
                </span>
              </div>
              <div className="header__cart-count">{props.cartGoodsCount}</div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
