import { CommonWidgetProps, DatavConfig, IBackgroundStyle } from "../../typing";
import { css } from "@emotion/css";
import { useRef } from "react";
import { DatavComWrapperContextProvider } from "./context";

type DatavComWrapperProps = {} & CommonWidgetProps;

export default ({ widget, children }: DatavComWrapperProps) => {
  var container = useRef<HTMLDivElement>(null);

  // console.log("props", widget);
  // pointer-events: ${onClick ? "initial" : "none"};

  return (
    <div
      ref={container}
      className={css`
  height: 100%;
  width: 100%;
  pointer-events: all;
  transform-origin: left top;
  position: relative;
}
`}
      // style={
      //   {
      //     ...getBackgroundStyle(widget.props),
      //     ...textStyle,
      //     ...getCustomStyle(backgroundStyle),
      //     ...getEllipsisStyle(ellipsis),
      //     textAlign: textAlign,
      //     letterSpacing: letterSpacing,
      //     writingMode: writingMode,
      //   } as any
      // }
    >
      <DatavComWrapperContextProvider value={{ container: container }}>
        {children}
      </DatavComWrapperContextProvider>
    </div>
  );
};
