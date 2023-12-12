import { CSSProperties } from "react";
import { BackgroundStyle } from "../typing";

const getCustomStyle = (style: BackgroundStyle) => {
  if (style?.show === true) {
    return {
      background: style.bgColor,
      borderRadius: style.borderRadius && `${style.borderRadius}px`,
      border: style.bgBorder
        ? `${style.bgBorder.width}px ${style.bgBorder.style} ${style.bgBorder.color}`
        : undefined,
    } as CSSProperties;
  }

  return {};
};
export default getCustomStyle;
