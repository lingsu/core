import { DataVConfig } from "../../typing";
import { css } from "@emotion/css";

type DatavComWrapperProps = {
  children: React.ReactNode;
} & DataVConfig;

export default ({ props, children }: DatavComWrapperProps) => {
  const { background, filter } = props;
  // pointer-events: ${onClick ? "initial" : "none"};
  const { type, value } =
    typeof background == "string"
      ? { type: "flat", value: background }
      : background;
  return (
    <div
      className={css`
  height: 100%;
  width: 100%;
  pointer-events: all;
  transform-origin: left top;
  position: relative;
}
`}
      style={{
        background: value,
      }}
    >
      {children}
    </div>
  );
};
