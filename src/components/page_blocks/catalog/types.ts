import type { GoodsItem } from "../../../types";

export type RefsElementType = {
  refPriceFrom: React.RefObject<HTMLInputElement>;
  refPriceTo: React.RefObject<HTMLInputElement>;
  refManufacturerSearch: React.RefObject<HTMLInputElement>;
  refBrandSearch: React.RefObject<HTMLInputElement>;
};

export type TypesOfCareItem = {
  index: number;
  isActive: boolean;
  onClick: any;
  value: string;
};

export type FilterBlockType = {
  itemsTypesOfCare: TypesOfCareItem[];
  goodsFilteredByCurrentPriceRange: GoodsItem[];
};
