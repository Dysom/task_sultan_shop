import { useEffect, createRef } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import type { InputTextState } from "../../../../types";

import { getInputTextStateFromEvent } from "../../../../utils";

type PropsType = {
  inputState: InputTextState;
  setField: any;
  onInput?: any;
  onChange?: any;
  className?: string;
  placeholder?: string;
  onKeyDown?: any;
};

type InputProps = {
  value: string;
  className?: string;
  onChange: any;
  onSelect: any;
  onFocus: any;
  onBlur: any;
  onInput: any;
  placeholder?: string;
  onKeyDown?: any;
};

export const InputText = (props: PropsType) => {
  const dispatch = useAppDispatch();

  const onUIEvent = (event: Event) => {
    if (event.type === "change" && props.onChange) {
      if (props.onChange(event) === "stopEvent") {
        return;
      }
    }

    const inputState = getInputTextStateFromEvent(event);
    dispatch(props.setField(inputState));
  };

  const inputState = props.inputState;

  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.setSelectionRange(
        inputState.selectionStart,
        inputState.selectionEnd
      );

      if (inputState.focus) {
        input.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputProps = {
    value: inputState.value,
  } as InputProps;

  if (props.className) {
    inputProps.className = props.className;
  }

  if (props.onInput) {
    inputProps.onInput = props.onInput;
  }

  if (props.onKeyDown) {
    inputProps.onKeyDown = props.onKeyDown;
  }

  inputProps.onChange =
    inputProps.onSelect =
    inputProps.onFocus =
    inputProps.onBlur =
      onUIEvent as any;

  if (props.placeholder) {
    inputProps.placeholder = props.placeholder;
  }

  return <input type="text" ref={inputRef} {...inputProps} />;
};
