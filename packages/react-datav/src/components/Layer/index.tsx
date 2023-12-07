import { CSSProperties, memo } from "react";

type LayerProps = {
  x: number;
  y: number;
  degree: number;
  opacity: number;
  flipH: boolean;
  flipV: boolean;
  h: number;
  w: number;
  hUnit: "px";
  wUnit: "px";
  xUnit: "px";
  yUnit: "px";
  style?: CSSProperties;
} & React.PropsWithChildren<unknown>;

const Layer = ({
  children,
  x = 0,
  y = 0,
  degree = 0,
  opacity = 1,
  flipH = false,
  flipV = false,
  h,
  w,
  hUnit = "px",
  wUnit = "px",
  xUnit = "px",
  yUnit = "px",
}: LayerProps) => {
  // pointer-events: ${onClick ? "initial" : "none"};

  // console.log('children',children)

  return (
    <div
      style={{
        width: w + wUnit,
        height: h + hUnit,
        transform: `translateX(${x}${xUnit}) translateY(${y}${yUnit})`,
        position: "absolute",
        willChange: "transform",
        pointerEvents: "none",
      }}
      className="datav-layer"
    >
      <div
        className="datav-common-hoc"
        style={{
          display: "block",
          height: "100%",
          width: "100%",
          opacity: opacity,
          position: "relative",
          transform: `rotate(${degree}deg) scaleX(${flipH ? -1 : 1}) scaleY(${
            flipV ? -1 : 1
          }) rotateZ(360deg)`,
          // onClick={onClick}
          // onMouseEnter={onMouseEnter}
          // onMouseLeave={onMouseLeave}
        }}
      >
        {children}
      </div>
    </div>
  );
};
Layer.displayName = "Layer";
export default memo(Layer);
