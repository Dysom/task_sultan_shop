import { useAppDispatch } from "../../../../app/hooks";
import { layout_icons_ico_trash_white_svg } from "../../../../images";
import { appendFilter, clearFilter } from "../../../../slices/catalogSlice";

export const FilterButtonsBlock = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="fields-box__append-settings">
      <button onClick={() => dispatch(appendFilter())} className="field-button">
        Показать
      </button>
      <button
        className="field-button field-button_circle"
        onClick={() => dispatch(clearFilter())}
      >
        <img src={layout_icons_ico_trash_white_svg} alt="clear" />
      </button>
    </div>
  );
};
