import React from "react";
import type { GoodsItemForCatalog } from "../../../../types";
import type { FilterBlockType } from "../types";

import { composeClassName } from "../../../../extensions/funcs";

import { FilterBlock } from "../desktop/filterBlock";
import { CardsList } from "../cardsList";
import { Pagination } from "../pagination";

type PropsType = FilterBlockType & {
  goodsItems: GoodsItemForCatalog[];
  pageNumber: number;
  firstPageOfPagination: number;
  lastPageOfPagination: number;
  pagesCount: number;
};

export const CatalogDesktop = (props: PropsType) => {
  return (
    <>
      <div className="main__ribbon ribbon-types-of-care">
        {props.itemsTypesOfCare.map((item) => (
          <button
            key={"ribbon_types_of_care__item_desktop_" + item.index}
            onClick={item.onClick}
            className={composeClassName(
              "ribbon-types-of-care__item",
              item.isActive,
              "ribbon-types-of-care__item_selected"
            )}
          >
            {item.value}
          </button>
        ))}
      </div>
      <div className="main__main-box">
        <FilterBlock {...(props as FilterBlockType)} />
        <div className="main__catalog">
          <div className="main__cards catalog">
            <CardsList goodsItems={props.goodsItems} isMobile={false} />
          </div>
          <Pagination
            startPage={props.firstPageOfPagination}
            endPage={props.lastPageOfPagination}
            currentPage={props.pageNumber}
            pagesCount={props.pagesCount}
          />
        </div>
      </div>
    </>
  );
};
