import type { FilterBlockType } from "../types";
import { composeClassName } from "../../../../extensions/funcs";
import { PriceRange } from "../priceRange";
import { SearchManufacturers } from "../searchBlock/searchManufacturers";
import { SearchBrands } from "../searchBlock/searchBrands";
import { ManufacturersList } from "../filterLists/ManufacturersList";
import { BrandsList } from "../filterLists/BrandsList";
import { FilterButtonsBlock } from "../filterButtonsBlock";

export const FilterBlock = (props: FilterBlockType) => {
  return (
    <div className="main__filter-box filter-box">
      <div className="filter-box__head">ПОДБОР ПО ПАРАМЕТРАМ</div>
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
      <div className="fields-box__block">
        {props.itemsTypesOfCare.map((item) => (
          <div
            key={"fields_box__care_link_desktop_" + item.index}
            onClick={item.onClick}
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
    </div>
  );
};
