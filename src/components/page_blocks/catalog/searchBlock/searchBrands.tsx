import type { RootState } from "../../../../types";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  setCurrentSearchBrandsField,
  setSearchBrandsFieldValueAndClearCurrentCheckedBrands,
} from "../../../../slices/catalogSlice";
import { SearchCommon } from "./searchCommon";

export const SearchBrands = () => {
  const catalogState = useAppSelector((state: RootState) => state.catalogPage);
  const dispatch = useAppDispatch();
  // console.log(
  //   "catalogState.currentSearchBrandsField",
  //   catalogState.currentSearchBrandsField.value,
  //   new Date().toString()
  // );
  return (
    <SearchCommon
      inputState={catalogState.currentSearchBrandsField}
      setField={setCurrentSearchBrandsField}
      placeholder="Поиск..."
      onSearch={() => {
        dispatch(setSearchBrandsFieldValueAndClearCurrentCheckedBrands());
      }}
    />
  );
};
