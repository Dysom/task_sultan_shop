import { useAppDispatch } from "../../../../app/hooks";
import { addToCartAndSaveCartState as addToCartAction } from "../../../../slices/cartSlice";
import { GoodsItemForCatalog } from "../../../../types";
import { Card as DesktopCard } from "../desktop/card";
import { Card as MobileCard } from "../mobile/card";

type PropsType = {
  goodsItems: GoodsItemForCatalog[];
  isMobile: boolean;
};

export const CardsList = (props: PropsType) => {
  const Card = props.isMobile ? MobileCard : DesktopCard;
  const dispatch = useAppDispatch();

  const addToCart = (barCode: number) => {
    return () => {
      dispatch(addToCartAction({ barCode, count: 1 }));
    };
  };

  return (
    <>
      {props.goodsItems.length > 0 ? (
        props.goodsItems.map((item) => (
          <Card
            key={item.barCode}
            item={item}
            addToCart={addToCart(item.barCode)}
          />
        ))
      ) : (
        <div style={props.isMobile ? { marginTop: 30 } : undefined}>
          Не найдено товаров, соответствующих заданным критериям...
        </div>
      )}
    </>
  );
};
