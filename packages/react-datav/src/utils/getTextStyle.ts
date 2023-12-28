import { TextStyle } from "../typing";
import getBackground from "./getBackground";

export default (textStyle?: TextStyle) => {
  if (textStyle) {
    return {
      fontWeight: textStyle.fontWeight,
      fontFamily: textStyle.fontFamily,
      color: getBackground(textStyle?.color),
      fontSize: textStyle.fontSize ? `${textStyle.fontSize}px` : undefined,
    };
  }
  return {};
};
