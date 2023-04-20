import { layout_icons_ico_search_white_svg } from "../../../../images";
import type { InputTextState } from "../../../../types";
import { InputText } from "../inputText";

type SearchCommonProps = {
  placeholder?: string;
  setField: any;
  inputState: InputTextState;
  onSearch: any;
};

export const SearchCommon = (props: SearchCommonProps) => {
  const inputTextProps = {
    inputState: props.inputState,
    setField: props.setField,
  } as any;

  if (props.placeholder) {
    inputTextProps.placeholder = props.placeholder;
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.code.toLowerCase() === "enter") {
      event.preventDefault();
      props.onSearch();
    }
  };

  inputTextProps.onKeyDown = onKeyDown;

  return (
    <span className="search-field">
      <InputText {...inputTextProps} />
      <button onClick={props.onSearch}>
        <img src={layout_icons_ico_search_white_svg} alt="search" />
      </button>
    </span>
  );
};
