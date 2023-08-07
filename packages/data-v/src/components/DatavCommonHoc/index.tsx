import { DataVConfig } from "../../typing";
import DatavComWrapper from "../DatavComWrapper";

type MainColorBlockProps = {
  children: React.ReactNode;
} & DataVConfig;

export default (props: MainColorBlockProps) => {
  const { common, children } = props;
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
      <DatavComWrapper
        common={props.common}
        props={props.props}
        attr={props.attr}
      >
        {children}
      </DatavComWrapper>
    </div>
  );
};
