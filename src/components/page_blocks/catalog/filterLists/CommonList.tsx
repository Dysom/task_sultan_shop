import { GoodsVendorEntity } from "../../../../types";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { RootState } from "../../../../types";
import { COUNT_FIRST_VENDORS } from "../../../../constants";
import { stringToHex } from "../../../../utils";
import { FilterListExpandButton } from "./filterListExpandButton";

type PropsType = {
  items: GoodsVendorEntity[];
  showOnlyFirstsSearched: boolean;
  entityTypeStr: string;
  currentChecked: string[];
  setCurrentChecked: any;
  searchFieldValue: string;
  expanded: boolean;
  onExpand: any;
  onCollapse: any;
};

export const CommonList = (props: PropsType) => {
  const isMobile = useAppSelector((state: RootState) => state.page.mobileMode);
  const dispatch = useAppDispatch();

  const items = props.items.filter(
    (item) =>
      item.name
        .toLocaleLowerCase()
        .indexOf(props.searchFieldValue.toLocaleLowerCase()) > -1
  );

  return (
    <>
      {items
        .filter(
          (item, index) =>
            !props.showOnlyFirstsSearched || index < COUNT_FIRST_VENDORS
        )
        .map((item, index, arr) => {
          const strId =
            props.entityTypeStr +
            "_" +
            (isMobile ? "mobile" : "desktop") +
            "_" +
            stringToHex(item.name);

          const checked = props.currentChecked.includes(item.name);

          const isLast = index === arr.length - 1;

          let className = "filter-box__checkbox-field";

          if (isLast) {
            className += " filter-box__checkbox-field_last";
          }

          return (
            <div key={strId} className={className}>
              <span className="checkbox-field">
                <input
                  onChange={() =>
                    dispatch(
                      props.setCurrentChecked({
                        name: item.name,
                        checked: !checked,
                      })
                    )
                  }
                  type="checkbox"
                  id={strId}
                  checked={checked}
                />
                <label htmlFor={strId}>
                  {item.name} <small>({item.count})</small>
                </label>
              </span>
            </div>
          );
        })}
      {items.length > COUNT_FIRST_VENDORS && (
        <FilterListExpandButton
          expanded={props.expanded}
          onExpand={props.onExpand}
          onCollapse={props.onCollapse}
        />
      )}
    </>
  );
};
