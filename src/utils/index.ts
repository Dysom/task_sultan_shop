import { GoodsItem, InputTextState, ItemQuantityType } from "../types";
import { adminFormFieldsDate } from "../data/adminFormFields";

export const getItemPropByName = (fieldName: string, item: GoodsItem) => {
  switch (fieldName) {
    case "imageUrl":
      return item.imageUrl;
    case "name":
      return item.name;
    case "quantityType":
      return item.quantityType;
    case "quantity":
      return item.quantity;
    case "barCode":
      return item.barCode;
    case "manufacturer":
      return item.manufacturer;
    case "brand":
      return item.brand;
    case "description":
      return item.description;
    case "price":
      return item.price;
    case "typesOfCare":
      return item.typesOfCare;
  }

  return "";
};

export const createGoodsItem = (): GoodsItem => {
  return {
    imageUrl: "no-image.svg",
    name: "",
    quantityType: ItemQuantityType.Volume,
    quantity: "",
    barCode: Date.now(),
    manufacturer: "",
    brand: "",
    description: "",
    price: 0,
    typesOfCare: [],
  };
};

export const setFieldToItem = (
  fieldName: string,
  fieldValue: any,
  goodsItem: GoodsItem
) => {
  switch (fieldName) {
    case "imageUrl":
      goodsItem.imageUrl = fieldValue;
      break;
    case "name":
      goodsItem.name = fieldValue;
      break;
    case "quantityType":
      if (fieldValue === ItemQuantityType.Volume.toString())
        goodsItem.quantityType = ItemQuantityType.Volume;
      else if (fieldValue === ItemQuantityType.Weight.toString())
        goodsItem.quantityType = ItemQuantityType.Weight;
      break;
    case "quantity":
      goodsItem.quantity = parseFloat(fieldValue);
      break;
    case "barCode":
      goodsItem.barCode = parseInt(fieldValue);
      break;
    case "manufacturer":
      goodsItem.manufacturer = fieldValue;
      break;
    case "brand":
      goodsItem.brand = fieldValue;
      break;
    case "description":
      goodsItem.description = fieldValue;
      break;
    case "price":
      goodsItem.price = parseFloat(fieldValue);
      break;
    case "typesOfCare":
      goodsItem.typesOfCare = fieldValue;
      break;
  }
};

export function getObjectCopy<T>(sourceState: T): T {
  return JSON.parse(JSON.stringify(sourceState));
}

export const pathIsOnlyFileName = (path: string) => {
  return !(path.includes("/") || path.includes("\\"));
};

let typesOfCareArray = adminFormFieldsDate.find(
  (item) => item.fieldName === "typesOfCare"
)?.multiSelectOptions;

export const getTypesOfCare = () => {
  return typesOfCareArray;
};

export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

export function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}

export function stringToHex(text: string) {
  const bytes = Array.from(new TextEncoder().encode(text));

  return bytes.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, "0"),
    ""
  );
}

export function getInputTextInitialState(value: string): InputTextState {
  return {
    value: value,
    focus: false,
    selectionStart: 0,
    selectionEnd: 0,
  };
}
export function getInputTextStateFromEvent(event: Event): InputTextState {
  if (!(event.target instanceof HTMLInputElement))
    return getInputTextInitialState("");

  const input = event.target as HTMLInputElement;
  return {
    value: input.value,
    focus: document.activeElement === input,
    selectionStart: input.selectionStart == null ? 0 : input.selectionStart,
    selectionEnd: input.selectionEnd == null ? 0 : input.selectionEnd,
  };
}

export const getPreviewImagePath = (path: string) => {
  if (pathIsOnlyFileName(path)) {
    return `/images/goods/` + path;
  }

  return path;
};

export function* generateSequence(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export function getIndexFromGoodsSortedByBarCodeAlt(
  sortedGoods: GoodsItem[],
  barCode: number
) {
  let start = 0;
  let end = sortedGoods.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (sortedGoods[middle].barCode === barCode) {
      return middle;
    } else if (sortedGoods[middle].barCode < barCode) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return -1;
}

export function getIndexFromGoodsSortedByBarCode(
  sortedGoods: GoodsItem[],
  barCode: number
) {
  return binarySearchIndex(
    sortedGoods,
    barCode,
    (item: GoodsItem) => item.barCode
  );
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price);
};

export function binarySearchIndex<T>(
  items: T[],
  value: number,
  transFunc: (item: T) => any
) {
  let start = 0;
  let end = items.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (transFunc(items[middle]) === value) {
      return middle;
    } else if (transFunc(items[middle]) < value) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return -1;
}
