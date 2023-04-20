import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GoodsItem } from "../types";
import { getPreviewImagePath } from "../utils";
import { DEFAULT_NOIMAGE_FILENAME } from "../constants";

export interface AdminPageState {
  showModal: boolean;
  create: boolean;
  currentItemBarCode: number;
  formError: boolean;
  errorField: string;
  goodsPreviewImageSrc: string;
}

const initialState: AdminPageState = {
  showModal: false,
  create: false,
  currentItemBarCode: -1,
  formError: false,
  errorField: "",
  goodsPreviewImageSrc: "",
};

export const adminSlice = createSlice({
  name: "adminPage",
  initialState,
  reducers: {
    openEditForm: (state, action: PayloadAction<GoodsItem>) => {
      state.create = false;
      state.currentItemBarCode = action.payload.barCode;
      state.showModal = true;
      state.goodsPreviewImageSrc = getPreviewImagePath(action.payload.imageUrl);
    },
    openCreateForm: (state) => {
      state.create = true;
      state.currentItemBarCode = -1;
      state.showModal = true;
      state.goodsPreviewImageSrc = getPreviewImagePath(
        DEFAULT_NOIMAGE_FILENAME
      );
    },
    closeForm: (state) => {
      state.showModal = false;
      state.formError = false;
    },
    setFormError: (state, action: PayloadAction<string>) => {
      state.formError = true;
      state.errorField = action.payload;
    },
    clearFormError: (state) => {
      state.formError = false;
    },
    setPreviewImageSrc: (state, action: PayloadAction<string>) => {
      state.goodsPreviewImageSrc = getPreviewImagePath(action.payload);
    },
  },
});

export const {
  openEditForm,
  openCreateForm,
  closeForm,
  setFormError,
  clearFormError,
  setPreviewImageSrc,
} = adminSlice.actions;

export default adminSlice.reducer;
