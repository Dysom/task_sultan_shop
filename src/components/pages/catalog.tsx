import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../types";
import { CatalogMobile } from "../page_blocks/catalog/mobile";
import { CatalogDesktop } from "../page_blocks/catalog/desktop";
import { getTypesOfCare } from "../../utils";
import { UIHandlers } from "../../extensions/classes/uihandlers";
import { setTypeOfCare, unsetTypeOfCare } from "../../slices/catalogSlice";
import { GOODS_COUNT_ON_PAGE } from "../../constants";
import { SortBlock } from "../page_blocks/catalog/sortBlock";
import { SultanPage } from "../page_blocks/sultanPage";

export const CatalogPage = () => {
  const rootState = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const mobileMode = rootState.page.mobileMode;
  let goods = rootState.goods.goodsSortedByBarCode;

  const catalogState = rootState.catalogPage;

  const sortKindNum = catalogState.sortKindNum;
  const activeTypesOfCare = catalogState.activeTypesOfCare;
  const selectedManufacturers = catalogState.selectedManufacturers;
  const selectedBrands = catalogState.selectedBrands;
  const pageNumber = catalogState.pageNumber;

  const goodsFilteredByCurrentPriceRange = goods.filter(
    (item) =>
      item.price >= catalogState.priceFromFieldValue &&
      item.price <= catalogState.priceToFieldValue
  );

  goods = goods.filter(
    (item) =>
      item.price >= catalogState.priceFromFieldValue &&
      item.price <= catalogState.priceToFieldValue
  );

  // if (catalogState.activeTypesOfCare.length > 0) {
  //   goods = goods.filter((item) => {
  //     return (
  //       item.typesOfCare &&
  //       item.typesOfCare.find((item) => activeTypesOfCare.includes(item)) !==
  //         undefined
  //     );
  //   });
  // }

  if (activeTypesOfCare.length > 0) {
    goods = goods.filter((item) => {
      return (
        item.typesOfCare &&
        item.typesOfCare.filter((item) => activeTypesOfCare.includes(item))
          .length === activeTypesOfCare.length
      );
    });
  }

  if (selectedManufacturers.length > 0) {
    goods = goods.filter((item) =>
      selectedManufacturers.includes(item.manufacturer)
    );
  }

  if (selectedBrands.length > 0) {
    goods = goods.filter((item) => selectedBrands.includes(item.brand));
  }

  if (goods.length > 1) {
    if (sortKindNum === 0) {
      goods.sort((itemA, itemB) => (itemA.name > itemB.name ? 1 : -1));
    } else if (sortKindNum === 1) {
      goods.sort((itemA, itemB) => (itemA.name < itemB.name ? 1 : -1));
    } else if (sortKindNum === 2) {
      goods.sort((itemA, itemB) => itemA.price - itemB.price);
    } else if (sortKindNum === 3) {
      goods.sort((itemA, itemB) => itemB.price - itemA.price);
    }
  }

  const pagesCount = Math.ceil(goods.length / GOODS_COUNT_ON_PAGE);

  let firstPageOfPagination = 1;
  let lastPageOfPagination = pagesCount;

  if (pagesCount > 5) {
    firstPageOfPagination = pageNumber - 2;
    lastPageOfPagination = pageNumber + 2;

    if (firstPageOfPagination < 1) {
      firstPageOfPagination = 1;
      lastPageOfPagination = 5;
    } else if (lastPageOfPagination > pagesCount) {
      lastPageOfPagination = pagesCount;
      firstPageOfPagination = pagesCount - 4;
    }
  }

  goods = goods.filter(
    (item, index) => Math.floor(index / GOODS_COUNT_ON_PAGE) + 1 === pageNumber
  );

  const barCodesOfItemsInCart = rootState.cart.items.map(
    (item) => item.barCode
  );

  const goodsWithFlagInCart = goods.map((item) => ({
    ...item,
    inCart: barCodesOfItemsInCart.includes(item.barCode),
  }));

  const typesOfCares = getTypesOfCare() as string[];

  const itemsTypesOfCare = typesOfCares.map((item, index) => {
    const isActive = activeTypesOfCare.includes(index);
    return {
      index,
      isActive,
      onClick: isActive
        ? UIHandlers.eventHandler(dispatch, unsetTypeOfCare(index))
        : UIHandlers.eventHandler(dispatch, setTypeOfCare(index)),
      value: item,
    };
  });

  const sortBlock = mobileMode ? <></> : <SortBlock />;
  const CatalogElement = mobileMode ? CatalogMobile : CatalogDesktop;
  const catalogBlock = (
    <CatalogElement
      itemsTypesOfCare={itemsTypesOfCare}
      goodsFilteredByCurrentPriceRange={goodsFilteredByCurrentPriceRange}
      goodsItems={goodsWithFlagInCart}
      pageNumber={pageNumber}
      firstPageOfPagination={firstPageOfPagination}
      lastPageOfPagination={lastPageOfPagination}
      pagesCount={pagesCount}
    />
  );

  const breadCrumbs = [{ text: "Каталог" }];

  return (
    <SultanPage
      mainBlock={catalogBlock}
      sortBlock={sortBlock}
      pageTitle="Каталог товаров"
      breadCrumbs={breadCrumbs}
    />
  );
};
