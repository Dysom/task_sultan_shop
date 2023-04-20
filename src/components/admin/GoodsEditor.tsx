import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import type { FieldSetProps, GoodsItem } from "../../types";
import { getItemPropByName, createGoodsItem } from "../../utils";
import { adminFormFieldsDate } from "../../data/adminFormFields";
import { FieldSet } from "./FieldSet";
import {
  editGoods,
  createGoodsAndSortGoodsArray,
} from "../../slices/goodsSlice";
import { closeForm, setFormError } from "../../slices/adminSlice";
import { validateForm, formToGoodsItem } from "./form";
import { getObjectCopy } from "../../utils";
import { saveChangesToLocalStorage } from "../../utils/goods";
import { DEFAULT_NOIMAGE_FILENAME } from "../../constants";

export const GoodsEditor = () => {
  const dispatch = useDispatch();

  const fullState = useSelector((state: RootState) => state);

  const {
    currentItemBarCode,
    create: createNew,
    formError,
    errorField: errorFieldName,
  } = fullState.adminPage;

  const currentItem = createNew
    ? null
    : fullState.goods.goodsSortedByBarCode.find(
        (item) => item.barCode === currentItemBarCode
      );

  const acceptModalForm = (event: React.FormEvent) => {
    event.preventDefault();

    const validateResult = validateForm(event.currentTarget as HTMLFormElement);

    if (validateResult == null) {
      const goodsItem = createNew
        ? createGoodsItem()
        : getObjectCopy(currentItem);

      formToGoodsItem(
        event.currentTarget as HTMLFormElement,
        goodsItem as GoodsItem
      );

      if (createNew) {
        dispatch(createGoodsAndSortGoodsArray(goodsItem as GoodsItem));

        saveChangesToLocalStorage();
      } else {
        dispatch(editGoods(goodsItem as GoodsItem));

        saveChangesToLocalStorage();
      }

      dispatch(closeForm());
    } else {
      dispatch(setFormError(validateResult));
    }
  };

  const closeModalForm = () => {
    dispatch(closeForm());
  };

  return (
    <>
      <form className="admin-page-form" onSubmit={acceptModalForm}>
        {adminFormFieldsDate.map((item, index) => {
          let fieldValue: string | number | Array<number> | undefined = "";

          if (!createNew && currentItem) {
            let itemValue = getItemPropByName(item.fieldName, currentItem);

            if (itemValue) {
              if (item.fieldType === "multi-select") {
                fieldValue = itemValue ? itemValue : [];
              } else {
                fieldValue = itemValue.toString();
              }
            }
          } else if (createNew) {
            if (item.fieldName === "imageUrl") {
              fieldValue = DEFAULT_NOIMAGE_FILENAME;
            }
          }

          const props: FieldSetProps = {
            ...item,
            formError,
            errorFieldName,
            fieldValue,
          };

          return <FieldSet key={"admin-page-form_" + index} {...props} />;
        })}
        <fieldset className="admin-page-form__fieldset">
          <button className="admin-page-form__button" type="submit">
            Принять
          </button>
          <button className="admin-page-form__button" onClick={closeModalForm}>
            Отмена
          </button>
        </fieldset>
      </form>
    </>
  );
};
