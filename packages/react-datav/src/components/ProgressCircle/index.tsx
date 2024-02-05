const getPath = (width: number) => {
  return (
    `M ${width},${width} m 0,-` +
    width +
    " a " +
    width +
    "," +
    width +
    " 0 1 1 0," +
    2 * width +
    " a " +
    width +
    "," +
    width +
    " 0 1 1 0,-" +
    2 * width
  );
};

export default (props: {
  percent: number;
  size: number;
  underlayStrokeWidth: number;
  overlayStrokeWidth: number;
  backgroundColor: string;
  progressive?: boolean;
  color: string;
}) => {
  let overlayWidth =
    props.size -
    props.overlayStrokeWidth / 2 -
    (props.underlayStrokeWidth - props.overlayStrokeWidth) / 2;

  let overlayPath = getPath(overlayWidth);
  let dasharray = 2 * Math.PI * overlayWidth;
  let strokeDasharray = dasharray + "px " + dasharray + "px";

  return (
    <div>
      <svg
        viewBox={`0 0 ${props.size * 2} ${props.size * 2}`}
        style={{ width: props.size, height: props.size }}
      >
        <path
          d={getPath(props.size - props.underlayStrokeWidth / 2)}
          fillOpacity={0}
          //   style={{ stroke: "rgba(0, 0, 0, 0.27)" }}
          strokeWidth={`${props.underlayStrokeWidth}px`}
          stroke={props.backgroundColor}
        ></path>
        <path
          d={overlayPath}
          fillOpacity={0}
          strokeDasharray={strokeDasharray}
          strokeWidth={`${props.overlayStrokeWidth}px`}
          strokeDashoffset="231.22121930420877px"
          stroke={props.color}
        ></path>
      </svg>
    </div>
  );
};
