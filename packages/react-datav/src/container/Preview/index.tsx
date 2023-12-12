import React, { memo } from "react";
import AbsoluteContainer, { Display } from "../AbsoluteContainer";
import { Viewport } from "../../typing";

const Preview = ({
  children,
  w,
  h,
  background,
  display = Display.ScaleByWidth,
}: React.PropsWithChildren<Viewport>) => {
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
