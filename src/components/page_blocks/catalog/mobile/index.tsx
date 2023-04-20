import React from "react";
import { GoodsItemForCatalog } from "../../../../types";
import type { FilterBlockType } from "../types";

import { FilterBlock } from "./filterBlock";
import { CardsList } from "../cardsList";
import { Pagination } from "../pagination";
import { SortBlock } from "../sortBlock";

type PropsType = FilterBlockType & {
  goodsItems: GoodsItemForCatalog[];
  pageNumber: number;
  pagesCount: number;
  firstPageOfPagination: number;
  lastPageOfPagination: number;
};

export const CatalogMobile = (props: PropsType) => {
  return (
    <>
      <div className="main__filter-box filter-box">
        <FilterBlock {...(props as FilterBlockType)} />
        {props.goodsItems.length > 0 && (
          <div className="main__sort sort-box">
            <SortBlock />
          </div>
        )}
      </div>

      <div className="main__catalog">
        <div className="main__cards">
          <CardsList goodsItems={props.goodsItems} isMobile={true} />
        </div>
        <Pagination
          startPage={props.firstPageOfPagination}
          endPage={props.lastPageOfPagination}
          currentPage={props.pageNumber}
          pagesCount={props.pagesCount}
        />
      </div>
    </>
  );
};
