import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import type { RootState, GoodsItem } from "../../../../types";
import { setCurrentCheckedManufacturers } from "../../../../slices/catalogSlice";
import { CommonList } from "./CommonList";
import {
  expandManufacturers,
  collapseManufacturers,
} from "../../../../slices/catalogSlice";
import { getArrayOfEntitiesFromGoods } from "../funcs";

type PropsType = {
  goodsFilteredByCurrentPriceRange: GoodsItem[];
};

export const ManufacturersList = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const catalogState = useAppSelector((state: RootState) => state.catalogPage);

  let manufacturersArray = getArrayOfEntitiesFromGoods(
    props.goodsFilteredByCurrentPriceRange,
    "manufacturer"
  );

  return (
    <CommonList
      items={manufacturersArray}
      showOnlyFirstsSearched={catalogState.showOnlyFirstsSearchedManufacturers}
      entityTypeStr="manufacturer"
      currentChecked={catalogState.currentCheckedManufacturers}
      setCurrentChecked={setCurrentCheckedManufacturers}
      searchFieldValue={catalogState.searchManufacturersFieldValue}
      onCollapse={() => dispatch(collapseManufacturers())}
      onExpand={() => dispatch(expandManufacturers())}
      expanded={!catalogState.showOnlyFirstsSearchedManufacturers}
    />
  );
};
