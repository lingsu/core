import { CSSProperties, useContext, useEffect } from "react";
import { CommonWidgetProps } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";

export default (props: CommonWidgetProps) => {
  const { widget } = props;

  const { backgroundImage, repeat, radius, cursor, urlConfig } = widget.props;
  const wrapper = useContext(DatavComWrapperContext);
  useEffect(() => {
    if (wrapper.container?.current) {
      var style: CSSProperties = {
        // ...getBackgroundStyle(widget.props),
        // ...getCustomStyle(backgroundStyle),
        // ...getEllipsisStyle(ellipsis),
        // ...getTextStyle(textStyle),
        // letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
        // writingMode: writingMode,
        // display: "flex",
        // alignItems: "center",
        // cursor: "default",
        // justifyContent: justifyContent[textAlign],
        backgroundRepeat: repeat || "no-repeat",
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        borderRadius: radius || 0,
        cursor: cursor ? "pointer" : "default",
      };
      console.log("style", style);
      Object.entries(style).forEach(([key, value]) => {
        wrapper.container!.current!.style[key] = value;
      });
      // wrapper.container.current.style.background = getBackground(background) as string;
    }
  }, []);
  if (urlConfig && urlConfig.url) {
    return (
      <a
        href={urlConfig.url}
        target={urlConfig.ifBlank ? "_blank" : undefined}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      ></a>
    );
  }
  return null;
};
