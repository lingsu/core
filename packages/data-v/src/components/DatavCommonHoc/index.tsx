import { CommonWidgetProps } from "../../typing";
import DatavComWrapper from "../DatavComWrapper";

type MainColorBlockProps = {} & CommonWidgetProps;

export default ({ widget, children }: MainColorBlockProps) => {
  const { common, props, attr } = widget;
  const { hide = false, degree = 0, opacity = 1 } = { ...common };


  return (
    <div
      style={{
        display: "block",
        height: "100%",
        width: "100%",
        opacity: opacity,
        position: "relative",
        transform: `rotate(${degree}deg) scaleX(1) scaleY(1) rotateZ(360deg)`,
        // onClick={onClick}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
      }}
    >
      <DatavComWrapper widget={widget}>{children}</DatavComWrapper>
    </div>
  );
};
