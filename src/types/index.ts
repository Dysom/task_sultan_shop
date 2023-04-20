export type { RootState, AppDispatch } from "../store";

export type GoodsItem = {
  imageUrl: string;
  name: string;
  fullName?: string;
  quantityType: ItemQuantityType;
  quantity: string | number;
  barCode: number;
  manufacturer: string;
  brand: string;
  description: string;
  price: number;
  purpose?: string;
  article?: number;
  typesOfCare?: Array<number>;
};

export enum ItemQuantityType {
  Volume = "volume",
  Weight = "weight",
}

export type InputFields = {
  fieldName: string;
  placeholder?: string;
  errorNote?: string;
  fieldType: string;
  fieldLabel: string;
  readonly?: boolean;
  selectOptions?: Array<[string, string]>;
  allowEmpty?: boolean;
  multiSelectOptions?: Array<string>;
};

export type FieldSetProps = InputFields & {
  formError: boolean;
  errorFieldName: string;
  fieldValue: undefined | string | number | Array<number>;
};

export type GoodsVendorEntity = { name: string; count: number };

export type InputTextState = {
  value: string;
  focus: boolean;
  selectionStart: number;
  selectionEnd: number;
};

export type GoodsItemForCart = GoodsItem & {
  count: number;
  totalPrice: number;
};

export type GoodsItemForCatalog = GoodsItem & {
  inCart: boolean;
};
