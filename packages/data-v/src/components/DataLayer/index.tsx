import { css } from "@emotion/css";
import { CSSProperties, memo } from "react";

import { CommonWidgetProps, DatavConfig, IAttr, ICommon } from "../../typing";
import DatavCommonHoc from "../DatavCommonHoc";

type DataLayerProps = {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: CSSProperties;
} & CommonWidgetProps;

const DataLayer = ({
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
        width: w + wUnit,
        height: h + hUnit,
        transform: `translateX(${x}${xUnit}) translateY(${y}${yUnit})`,
        position: "absolute",
        willChange: "transform",
        pointerEvents:'none'
      }}
      className="datav-layer"
    >
      <DatavCommonHoc widget={widget}>{children}</DatavCommonHoc>
    </div>
  );
};
DataLayer.displayName = "DataLayer";
export default memo(DataLayer);