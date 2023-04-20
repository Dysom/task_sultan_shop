import { useAppDispatch } from "../../../../app/hooks";
import {
  layout_icons_ico_pagination_back_svg,
  layout_icons_ico_pagination_forward_svg,
} from "../../../../images";
import { setPage } from "../../../../slices/catalogSlice";
import { generateSequence } from "../../../../utils";

type PaginationType = {
  startPage: number;
  endPage: number;
  currentPage: number;
  pagesCount: number;
};

export const Pagination = (props: PaginationType) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {props.pagesCount > 1 && (
        <div className="main__pagination">
          <div className="pagination">
            <button
              className="pagination__back"
              onClick={
                props.currentPage > props.startPage
                  ? () => dispatch(setPage(props.currentPage - 1))
                  : undefined
              }
            >
              <img src={layout_icons_ico_pagination_back_svg} alt="back" />
            </button>
            {Array.from(generateSequence(props.startPage, props.endPage)).map(
              (item, index) => (
                <button
                  key={"page_link_" + item}
                  onClick={
                    item === props.currentPage
                      ? undefined
                      : () => dispatch(setPage(item))
                  }
                  className={
                    "pagination__item" +
                    (item === props.currentPage
                      ? " pagination__item_active"
                      : "")
                  }
                >
                  {item}
                </button>
              )
            )}
            <button
              className="pagination__forward"
              onClick={
                props.currentPage < props.endPage
                  ? () => dispatch(setPage(props.currentPage + 1))
                  : undefined
              }
            >
              <img
                src={layout_icons_ico_pagination_forward_svg}
                alt="forward"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
