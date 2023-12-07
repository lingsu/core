import React, { memo } from "react";
import AbsoluteContainer, { Display } from "../AbsoluteContainer";

const Preview = ({
  children,
  w,
  h,
  background,
  display = Display.ScaleByWidth,
}: React.PropsWithChildren<{
  w: number;
  h: number;
  //   degree: number;
  //   opacity: number;
  //   flipH: boolean;
  //   flipV: boolean;
  //   xUnit: string;
  //   yUnit: string;
  background: string;
  display?: Display;
}>) => {
  return (
    <div
      className="datav-preview"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <AbsoluteContainer
        display={display}
        w={w}
        h={h}
        background={background}
      >
        {children}
      </AbsoluteContainer>
    </div>
  );
};

Preview.displayName = "Preview";

export default memo(Preview);
