
import { IProps } from "../typing";
import getBackground from "./getBackground";

export default (props: IProps) => {
  const { background, backgroundImage, backgroundColor } = props;

  return background
    ? {background: getBackground(background)}
    : {
        backgroundImage:
          backgroundImage && "none" != backgroundImage
            ? `url(${backgroundImage})`
            : "none",
        backgroundColor: backgroundColor || "transparent",
      };
};
