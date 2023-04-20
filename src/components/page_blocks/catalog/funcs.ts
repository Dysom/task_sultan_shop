import { GoodsItem } from "../../../types";

type GoodsItemPropName = keyof GoodsItem;

export const getArrayOfEntitiesFromGoods = (
  goods: GoodsItem[],
  propName: string
) => {
  const entities = Array.from(
    goods
      .reduce((accumulator, item) => {
        let propValue = item[propName as GoodsItemPropName] as string;

        if (accumulator.has(propValue)) {
          accumulator.set(
            propValue,
            (accumulator.get(propValue) as number) + 1
          );
        } else {
          accumulator.set(propValue, 1);
        }

        return accumulator;
      }, new Map<string, number>())
      .entries()
  ).map((item) => ({ name: item[0], count: item[1] }));

  return entities;
};
