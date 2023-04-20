import {
  layout_icons_ico_bottom_svg,
  layout_icons_ico_top_svg,
} from "../../../../images";

type PropsType = {
  collapsed: boolean;
  onCollapse: any;
  onExpand: any;
};

export const HideFilterButton = (props: PropsType) => (
  <button
    className="field-box__collapse circle-link"
    onClick={props.collapsed ? props.onExpand : props.onCollapse}
  >
    <span className="circle-link__img-wrapper">
      {props.collapsed ? (
        <img src={layout_icons_ico_bottom_svg} alt="collapse" />
      ) : (
        <img src={layout_icons_ico_top_svg} alt="expand" />
      )}
    </span>
  </button>
);
