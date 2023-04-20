import type { RootState } from "../../../../types";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  setCurrentSearchManufacturersField,
  setSearchManufacturersFieldValueAndClearCurrentCheckedManufacturers,
} from "../../../../slices/catalogSlice";
import { SearchCommon } from "./searchCommon";

export const SearchManufacturers = () => {
  const catalogState = useAppSelector((state: RootState) => state.catalogPage);
  const dispatch = useAppDispatch();

  return (
    <SearchCommon
      inputState={catalogState.currentSearchManufacturersField}
      setField={setCurrentSearchManufacturersField}
      placeholder="Поиск..."
      onSearch={() => {
        dispatch(
          setSearchManufacturersFieldValueAndClearCurrentCheckedManufacturers()
        );
      }}
    />
  );
};
