import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EArray } from "../extensions/classes/earray";
import { InputTextState } from "../types";
import { getInputTextInitialState } from "../utils";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;
const SEARCH_MANUFACTURERS = "";
const SEARCH_BRANDS = "";

const initialState = {
  activeTypesOfCare: [] as number[],
  selectedManufacturers: [] as string[],
  selectedBrands: [] as string[],
  priceFromFieldValue: MIN_PRICE,
  priceToFieldValue: MAX_PRICE,
  searchManufacturersFieldValue: SEARCH_MANUFACTURERS,
  searchBrandsFieldValue: SEARCH_BRANDS,
  showOnlyFirstsSearchedManufacturers: true,
  showOnlyFirstsSearchedBrands: true,
  mobileFilterCollapsed: false,
  sortKindNum: 0,
  pageNumber: 1,
  currentCheckedManufacturers: [] as string[],
  currentCheckedBrands: [] as string[],

  currentPriceFromField: getInputTextInitialState(MIN_PRICE.toString()),
  currentPriceToField: getInputTextInitialState(MAX_PRICE.toString()),
  currentSearchManufacturersField:
    getInputTextInitialState(SEARCH_MANUFACTURERS),
  currentSearchBrandsField: getInputTextInitialState(SEARCH_BRANDS),

  errorFieldName: "",
};

export type CatalogState = typeof initialState;

export const catalogPageSlice = createSlice({
  name: "catalogPage",
  initialState: initialState as CatalogState,
  reducers: {
    setTypeOfCare: (state, { payload: numberValue }: PayloadAction<number>) => {
      EArray.insertUnique(state.activeTypesOfCare, numberValue);
      state.pageNumber = 1;
    },
    unsetTypeOfCare: (
      state,
      { payload: numberValue }: PayloadAction<number>
    ) => {
      EArray.deleteUnique(state.activeTypesOfCare, numberValue);
      state.pageNumber = 1;
    },
    expandMobileFilter: (state) => {
      state.mobileFilterCollapsed = false;
    },
    collapseMobileFilter: (state) => {
      state.mobileFilterCollapsed = true;
    },
    expandManufacturers: (state) => {
      state.showOnlyFirstsSearchedManufacturers = false;
    },
    collapseManufacturers: (state) => {
      state.showOnlyFirstsSearchedManufacturers = true;
    },
    expandBrands: (state) => {
      state.showOnlyFirstsSearchedBrands = false;
    },
    collapseBrands: (state) => {
      state.showOnlyFirstsSearchedBrands = true;
    },
    setCurrentPriceFromField: (
      state,
      { payload }: PayloadAction<InputTextState>
    ) => {
      state.currentPriceFromField = payload;
    },
    setCurrentPriceToField: (
      state,
      { payload }: PayloadAction<InputTextState>
    ) => {
      state.currentPriceToField = payload;
    },
    setCurrentSearchManufacturersField: (
      state,
      { payload }: PayloadAction<InputTextState>
    ) => {
      state.currentSearchManufacturersField = payload;
    },
    setCurrentSearchBrandsField: (
      state,
      { payload }: PayloadAction<InputTextState>
    ) => {
      state.currentSearchBrandsField = payload;
    },
    setCurrentCheckedManufacturers: (
      state,
      { payload }: PayloadAction<{ name: string; checked: boolean }>
    ) => {
      if (payload.checked) {
        EArray.insertUnique(state.currentCheckedManufacturers, payload.name);
      } else {
        EArray.deleteUnique(state.currentCheckedManufacturers, payload.name);
      }
    },
    setCurrentCheckedBrands: (
      state,
      { payload }: PayloadAction<{ name: string; checked: boolean }>
    ) => {
      if (payload.checked) {
        EArray.insertUnique(state.currentCheckedBrands, payload.name);
      } else {
        EArray.deleteUnique(state.currentCheckedBrands, payload.name);
      }
    },
    clearCurrentCheckedManufacturers: (state) => {
      state.currentCheckedManufacturers = [];
    },
    clearCurrentCheckedBrands: (state) => {
      state.currentCheckedBrands = [];
    },
    setSearchManufacturersFieldValueAndClearCurrentCheckedManufacturers: (
      state
    ) => {
      state.searchManufacturersFieldValue =
        state.currentSearchManufacturersField.value;
      state.currentCheckedManufacturers = [];
    },
    setSearchBrandsFieldValueAndClearCurrentCheckedBrands: (state) => {
      state.searchBrandsFieldValue = state.currentSearchBrandsField.value;
      state.currentCheckedBrands = [];
    },
    clearFilter: (state) => {
      state.errorFieldName = "";

      state.currentCheckedManufacturers = [];
      state.currentCheckedBrands = [];
      state.currentSearchManufacturersField =
        getInputTextInitialState(SEARCH_MANUFACTURERS);

      state.currentSearchBrandsField = getInputTextInitialState(SEARCH_BRANDS);
      state.currentPriceFromField = getInputTextInitialState(
        MIN_PRICE.toString()
      );
      state.currentPriceToField = getInputTextInitialState(
        MAX_PRICE.toString()
      );

      state.selectedManufacturers = [];
      state.selectedBrands = [];
      state.priceFromFieldValue = MIN_PRICE;
      state.priceToFieldValue = MAX_PRICE;
      state.searchManufacturersFieldValue = SEARCH_MANUFACTURERS;
      state.searchBrandsFieldValue = SEARCH_BRANDS;

      state.pageNumber = 1;
    },
    appendFilter: (state) => {
      const priceFromFieldValue = parseFloat(state.currentPriceFromField.value);
      const priceToFieldValue = parseFloat(state.currentPriceToField.value);

      if (isNaN(priceFromFieldValue)) {
        state.errorFieldName = "priceFromFieldValue";
        return;
      }
      if (isNaN(priceToFieldValue)) {
        state.errorFieldName = "priceToFieldValue";
        return;
      }

      state.priceFromFieldValue = priceFromFieldValue;
      state.priceToFieldValue = priceToFieldValue;

      state.selectedManufacturers = state.currentCheckedManufacturers.length
        ? Array.from(state.currentCheckedManufacturers)
        : [];

      state.selectedBrands = state.currentCheckedBrands.length
        ? Array.from(state.currentCheckedBrands)
        : [];

      state.pageNumber = 1;
    },
    setPage: (state, { payload: pageNumber }: PayloadAction<number>) => {
      state.pageNumber = pageNumber;
    },
    setSort: (state, { payload: sortKindNum }: PayloadAction<number>) => {
      if (sortKindNum !== state.sortKindNum) {
        state.pageNumber = 1;
        state.sortKindNum = sortKindNum;
      }
    },
  },
});

export const {
  setTypeOfCare,
  unsetTypeOfCare,
  expandMobileFilter,
  collapseMobileFilter,
  expandManufacturers,
  collapseManufacturers,
  expandBrands,
  collapseBrands,
  setCurrentPriceFromField,
  setCurrentPriceToField,
  setCurrentSearchManufacturersField,
  setCurrentSearchBrandsField,
  setCurrentCheckedManufacturers,
  setCurrentCheckedBrands,
  clearCurrentCheckedManufacturers,
  clearCurrentCheckedBrands,
  setSearchManufacturersFieldValueAndClearCurrentCheckedManufacturers,
  setSearchBrandsFieldValueAndClearCurrentCheckedBrands,
  appendFilter,
  clearFilter,
  setPage,
  setSort,
} = catalogPageSlice.actions;

export default catalogPageSlice.reducer;
