import { css } from "@emotion/css";
import { CSSProperties } from "react";
import { IAttr } from "../../typing";

type DataLayerProps = {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
} & IAttr;

export default (props: DataLayerProps) => {
  const {
    onClick,
    onMouseEnter,
    onMouseLeave,
    x,
    y,
    deg = 0,
    opacity = 1,
    children,
    ...rest
  } = props;
  // pointer-events: ${onClick ? "initial" : "none"};

  return (
    <div
      style={{
        ...rest,
        transform: `translateX(${x}px) translateY(${y}px)`,
        cursor: onClick ? "pointer" : undefined,
      }}
      className={css`
        position: absolute;
        will-change: transform;
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          display: "block",
          height: "100%",
          width: "100%",
          opacity: opacity,
          position: "relative",
          transform: `rotate(${deg}deg) scaleX(1) scaleY(1) rotateZ(360deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
