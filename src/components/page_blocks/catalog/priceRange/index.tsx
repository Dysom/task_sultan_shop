import { useEffect, createRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import type { InputTextState, RootState } from "../../../../types";

import {
  setCurrentPriceFromField,
  setCurrentPriceToField,
} from "../../../../slices/catalogSlice";
import { getInputTextStateFromEvent } from "../../../../utils";

import { InputText } from "../inputText";

export const PriceRange = () => {
  const catalogState = useAppSelector((state: RootState) => state.catalogPage);

  const onChangeHandler = (restoreState: InputTextState) => {
    return (event: Event) => {
      const input = event.target as HTMLInputElement;

      if (!input.value.match(/^((\d+)|(\d+\.\d*)|(\.\d+))$/)) {
        event.preventDefault();

        input.value = restoreState.value;
        input.setSelectionRange(
          restoreState.selectionStart,
          restoreState.selectionEnd
        );

        return "stopEvent";
      }
    };
  };

  return (
    <>
      <span className="field-box__price-wrapper">
        <InputText
          inputState={catalogState.currentPriceFromField}
          setField={setCurrentPriceFromField}
          className="filter-box__price-input"
          onChange={onChangeHandler(catalogState.currentPriceFromField)}
        />
      </span>
      <span className="field-box__price-splitter">-</span>
      <span className="field-box__price-wrapper">
        <InputText
          inputState={catalogState.currentPriceToField}
          setField={setCurrentPriceToField}
          className="filter-box__price-input"
          onChange={onChangeHandler(catalogState.currentPriceToField)}
        />
      </span>
    </>
  );
};
