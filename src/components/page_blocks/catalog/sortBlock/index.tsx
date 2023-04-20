import { createRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import type { RootState } from "../../../../types";
import { setSort } from "../../../../slices/catalogSlice";

export const SortBlock = () => {
  const sortKindNum = useAppSelector(
    (state: RootState) => state.catalogPage.sortKindNum
  );
  const dispatch = useAppDispatch();
  const select = createRef<HTMLSelectElement>();

  return (
    <div className="sort-box__field">
      Сортировка:
      <select
        ref={select}
        className="sort-box__select"
        value={sortKindNum}
        onChange={() =>
          dispatch(
            setSort(parseInt((select.current as HTMLSelectElement).value))
          )
        }
      >
        <option value="0">По названию возр.</option>
        <option value="1">По названию уб.</option>
        <option value="2">По цене возр.</option>
        <option value="3">По цене уб.</option>
      </select>
    </div>
  );
};
