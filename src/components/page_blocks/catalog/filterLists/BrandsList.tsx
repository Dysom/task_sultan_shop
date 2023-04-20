import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import type { RootState, GoodsItem } from "../../../../types";
import { setCurrentCheckedBrands } from "../../../../slices/catalogSlice";
import { CommonList } from "./CommonList";
import { expandBrands, collapseBrands } from "../../../../slices/catalogSlice";
import { getArrayOfEntitiesFromGoods } from "../funcs";

type PropsType = {
  goodsFilteredByCurrentPriceRange: GoodsItem[];
};

export const BrandsList = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const catalogState = useAppSelector((state: RootState) => state.catalogPage);

  let brandsArray = getArrayOfEntitiesFromGoods(
    props.goodsFilteredByCurrentPriceRange,
    "brand"
  );

  return (
    <CommonList
      items={brandsArray}
      showOnlyFirstsSearched={catalogState.showOnlyFirstsSearchedBrands}
      entityTypeStr="brand"
      currentChecked={catalogState.currentCheckedBrands}
      setCurrentChecked={setCurrentCheckedBrands}
      searchFieldValue={catalogState.searchBrandsFieldValue}
      onCollapse={() => dispatch(collapseBrands())}
      onExpand={() => dispatch(expandBrands())}
      expanded={!catalogState.showOnlyFirstsSearchedBrands}
    />
  );
};
