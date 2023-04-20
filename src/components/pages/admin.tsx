import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { GoodsList } from "../admin/GoodsList";
import { GoodsEditor } from "../admin/GoodsEditor";
import { openCreateForm } from "../../slices/adminSlice";

export const AdminPage = () => {
  const dispatch = useDispatch();

  const fullState = useSelector((state: RootState) => state);
  const mobileMode = fullState.page.mobileMode;
  const adminPageState = fullState.adminPage;

  let wrapperClassName = "admin-page";

  if (mobileMode) {
    wrapperClassName += " admin-page_mobile";
  }

  const createNewItem = () => {
    dispatch(openCreateForm());
  };

  return (
    <div className={wrapperClassName}>
      {adminPageState.showModal ? (
        <>
          <GoodsEditor />
        </>
      ) : (
        <>
          <h1>Администрирование товаров</h1>
          <button onClick={createNewItem} className="admin-common-button">
            Создать
          </button>
          <GoodsList />
        </>
      )}
    </div>
  );
};
