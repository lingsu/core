import { css } from "@emotion/css";
import { CSSProperties } from "react";

import { DataVConfig, IAttr, ICommon } from "../../typing";
import DatavCommonHoc from "../DatavCommonHoc";

type DataLayerProps = {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
} & DataVConfig;

export default ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  attr,
  common,
  children,
  props,
}: DataLayerProps) => {
  // pointer-events: ${onClick ? "initial" : "none"};
  const {
    x,
    y,
    h,
    w,
    hUnit = "px",
    wUnit = "px",
    xUnit = "px",
    yUnit = "px",
    // hide = false,
    // degree = 0,
  } = { ...attr };

  // const { hide = false, degree = 0, opacity = 1 } = { ...common };

  return (
    <div
      style={{
        // ...rest,
        width: w,
        height: h,
        transform: `translateX(${x}px) translateY(${y}px)`,
        // cursor: onClick ? "pointer" : undefined,
      }}
      // className={css`
      //   position: absolute;
      //   will-change: transform;
      // `}

    >
      <DatavCommonHoc attr={attr} props={props} common={common}>
        {children}
      </DatavCommonHoc>
      {/* <div
        style={{
          display: "block",
          height: "100%",
          width: "100%",
          opacity: opacity,
          position: "relative",
          transform: `rotate(${degree}deg) scaleX(1) scaleY(1) rotateZ(360deg)`,
        }}
      >
        {children}
      </div> */}
    </div>
  );
};
