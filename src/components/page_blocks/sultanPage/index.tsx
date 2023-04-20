import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../types";
import { HeaderMobile } from "../header/HeaderMobile";
import { HeaderDesktop } from "../header/HeaderDesktop";
import { FooterMobile } from "../footer/FooterMobile";
import { FooterDesktop } from "../footer/FooterDesktop";
import { getIndexFromGoodsSortedByBarCode } from "../../../utils";
import {
  layout_icons_ico_back_svg,
  layout_icons_ico_catalog_svg,
  layout_icons_ico_menu_svg,
} from "../../../images";

type SultanPageProps = {
  sortBlock: JSX.Element | null;
  mainBlock: JSX.Element;
  pageTitle: string;
  breadCrumbs: { text: string; href?: string }[];
};

export const SultanPage = ({
  mainBlock,
  sortBlock,
  pageTitle,
  breadCrumbs,
}: SultanPageProps) => {
  const rootState = useAppSelector((state: RootState) => state);

  const mobileMode = rootState.page.mobileMode;
  const goodsSortedByBarCode = rootState.goods.goodsSortedByBarCode;
  const cartItems = rootState.cart.items;

  const cartGoodsCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  const cartTotalPrice = cartItems.reduce((sum, item) => {
    const itemIndex = getIndexFromGoodsSortedByBarCode(
      goodsSortedByBarCode,
      item.barCode
    );
    return (
      sum +
      item.count * (itemIndex > -1 ? goodsSortedByBarCode[itemIndex].price : 0)
    );
  }, 0);

  const viewClassName = mobileMode ? "mobile" : "desktop";

  // console.log("mainBlock.type", mainBlock.type === CartDesktop);

  return (
    <div className={"page page_" + viewClassName}>
      {mobileMode ? (
        <HeaderMobile cartGoodsCount={cartGoodsCount} />
      ) : (
        <HeaderDesktop
          cartGoodsCount={cartGoodsCount}
          cartTotalPrice={cartTotalPrice}
        />
      )}
      {mobileMode ? (
        <main className="main">
          <div className="main__wrapper body-wrapper">
            <div className="main__back-link">
              <Link to="/catalog" className="circle-link">
                <span className="circle-link__img-wrapper">
                  <img src={layout_icons_ico_back_svg} alt="back" />
                </span>
                <span className="circle-link__text">Назад</span>
              </Link>
            </div>
            <h1 className="main__title">{pageTitle}</h1>
            {mainBlock}
          </div>
        </main>
      ) : (
        <main className="main">
          <div className="body-wrapper">
            <div className="main__wrapper">
              <div className="main__main-nav main-nav">
                {breadCrumbs.map((item, index, arr) =>
                  index < arr.length - 1 ? (
                    <Link
                      key={item.text}
                      className="main-nav__item"
                      to={item.href as string}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <span
                      key={item.text}
                      className="main-nav__item main-nav__item_active"
                    >
                      {item.text}
                    </span>
                  )
                )}
              </div>
              <div className="main__top">
                <h1 className="main__title">{pageTitle}</h1>
                <div className="main__top-block sort-box">
                  {sortBlock}
                  {sortBlock && (
                    <div className="sort-box__switcher sort-switcher">
                      <span className="sort-switcher__item">
                        <img src={layout_icons_ico_menu_svg} alt="catalog" />
                      </span>
                      <button className="sort-switcher__item sort-switcher__item_on">
                        <img src={layout_icons_ico_catalog_svg} alt="catalog" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {mainBlock}
            </div>
          </div>
        </main>
      )}
      {mobileMode ? <FooterMobile /> : <FooterDesktop />}
    </div>
  );
};
