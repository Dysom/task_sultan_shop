import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import type { RootState } from "../../../../types";
import type { FilterBlockType } from "../types";
import { composeClassName } from "../../../../extensions/funcs";
import {
  expandMobileFilter,
  collapseMobileFilter,
} from "../../../../slices/catalogSlice";
import { HideFilterButton } from "./hideFilterButton";
import { PriceRange } from "../priceRange";
import { SearchManufacturers } from "../searchBlock/searchManufacturers";
import { ManufacturersList } from "../filterLists/ManufacturersList";
import { SearchBrands } from "../searchBlock/searchBrands";
import { BrandsList } from "../filterLists/BrandsList";
import { FilterButtonsBlock } from "../filterButtonsBlock";

export const FilterBlock = (props: FilterBlockType) => {
  const catalogState = useAppSelector((state: RootState) => state.catalogPage);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="filter-box__head-wrapper">
        <div className="filter-box__head filter-box__head_internal">
          ПОДБОР ПО ПАРАМЕТРАМ
        </div>
        <HideFilterButton
          collapsed={catalogState.mobileFilterCollapsed}
          onExpand={() => dispatch(expandMobileFilter())}
          onCollapse={() => dispatch(collapseMobileFilter())}
        />
      </div>
      {!catalogState.mobileFilterCollapsed && (
        <>
          <div className="filter-box__price-block">
            <div className="filter-box__text">Цена, &#8376;</div>
            <div className="filter-box__field">
              <PriceRange />
            </div>
          </div>
          <div className="field-box__block">
            <div className="filter-box__title">Производитель</div>
            <div className="filter-box__search-field">
              <SearchManufacturers />
            </div>
            <ManufacturersList
              goodsFilteredByCurrentPriceRange={
                props.goodsFilteredByCurrentPriceRange
              }
            />
          </div>
          <div className="field-box__block field-box__block_bottom">
            <div className="filter-box__title">Бренд</div>
            <div className="filter-box__search-field">
              <SearchBrands />
            </div>
            <BrandsList
              goodsFilteredByCurrentPriceRange={
                props.goodsFilteredByCurrentPriceRange
              }
            />
          </div>
          <FilterButtonsBlock />
        </>
      )}
      <div className="fields-box__block">
        {props.itemsTypesOfCare.map((item) => (
          <div
            key={"fields_box__care_link_mobile_" + item.index}
            onClick={item.onClick as any}
            className={composeClassName(
              "fields-box__care-link",
              item.isActive,
              "fields-box__care-link_selected"
            )}
          >
            {item.value}
          </div>
        ))}
      </div>
    </>
  );
};
