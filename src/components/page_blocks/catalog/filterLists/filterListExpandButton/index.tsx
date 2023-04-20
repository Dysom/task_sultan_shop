type PropsType = {
  expanded: boolean;
  onExpand: any;
  onCollapse: any;
};

export const FilterListExpandButton = (props: PropsType) => (
  <div className="field-box__link-toggle">
    {props.expanded ? (
      <button onClick={props.onCollapse} className="link-toggle link-toggle_on">
        Показать первые
      </button>
    ) : (
      <button onClick={props.onExpand} className="link-toggle">
        Показать все
      </button>
    )}
  </div>
);
