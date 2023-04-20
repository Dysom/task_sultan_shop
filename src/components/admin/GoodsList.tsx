import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { GoodsItem, RootState } from "../../types";
import { deleteGoodsAndSortGoodsArrayIfNeeded } from "../../slices/goodsSlice";
import { saveChangesToLocalStorage } from "../../utils/goods";
import { openEditForm } from "../../slices/adminSlice";

const images_admin_icons_edit_svg: string =
  require("../../images/admin/icons/edit.svg").default;
const images_admin_icons_delete_svg: string =
  require("../../images/admin/icons/delete.svg").default;

export const GoodsList = () => {
  const dispatch = useDispatch();
  const goods = useSelector(
    (state: RootState) => state.goods.goodsSortedByBarCode
  );

  const editItem = (item: GoodsItem) => {
    dispatch(openEditForm(item));
  };

  const deleteItem = (barCode: number) => {
    dispatch(deleteGoodsAndSortGoodsArrayIfNeeded(barCode));

    saveChangesToLocalStorage();
  };

  return (
    <div className="admin-goods">
      {goods.map((item, index) => (
        <div key={"agi_" + item.barCode} className="admin-goods__item">
          <div className="admin-goods__name">
            <span>
              {index + 1}. {item.name}
            </span>
            <button
              title="edit"
              className="admin-goods__ico-button"
              onClick={() => editItem(item)}
            >
              <img
                className="admin-goods__ico"
                alt="edit"
                src={images_admin_icons_edit_svg}
              />
            </button>
            <button
              title="delete"
              className="admin-goods__ico-button"
              onClick={() => deleteItem(item.barCode)}
            >
              <img
                className="admin-goods__ico"
                alt="delete"
                src={images_admin_icons_delete_svg}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
