import { DatavConfig } from "../../typing";
import { css } from "@emotion/css";

type DatavComWrapperProps = {
  children: React.ReactNode;
} & DatavConfig;

export default ({ props, children }: DatavComWrapperProps) => {
  const {
    background,
    filter,
    ellipsis,
    textAlign,
    textStyle,
    writingMode,
    letterSpacing,
    backgroundStyle,
  } = props;
  console.log('props',props)
  // pointer-events: ${onClick ? "initial" : "none"};
  const { type, value } =
    (typeof background == "string"
      ? { type: "flat", value: background }
      : background) || {};
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
        textAlign: textAlign,
        letterSpacing: letterSpacing,
        writingMode: writingMode,
        
      }}
    >
      {children}
    </div>
  );
};
