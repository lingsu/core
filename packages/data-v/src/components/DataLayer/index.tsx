import { css } from "@emotion/css";
import { CSSProperties } from "react";

import { CommonWidgetProps, DatavConfig, IAttr, ICommon } from "../../typing";
import DatavCommonHoc from "../DatavCommonHoc";

type DataLayerProps = {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: CSSProperties;
} & CommonWidgetProps;

export default ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  widget,
}: DataLayerProps) => {
  // pointer-events: ${onClick ? "initial" : "none"};
  const { attr } = widget;
  const {
    x = 0,
    y = 0,
    h,
    w,
    hUnit = "px",
    wUnit = "px",
    xUnit = "px",
    yUnit = "px",
    // hide = false,
    // degree = 0,
  } = { ...attr };

  // console.log('children',children)
  if ((children! as any).type?.displayName === 'AbsoluteContainer') {
    return <DatavCommonHoc widget={widget}>{children}</DatavCommonHoc>;
  }
  return (
    <div
      style={{
        width: w,
        height: h,
        transform: `translateX(${x}px) translateY(${y}px)`,
        position: "absolute",
        willChange: "transform",
      }}
      className="datav-layer"
    >
      <DatavCommonHoc widget={widget}>{children}</DatavCommonHoc>
    </div>
  );
};
