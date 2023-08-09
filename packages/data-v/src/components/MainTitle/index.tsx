import { CSSProperties, useContext, useEffect } from "react";
import { CommonWidgetProps, DatavConfig, IBackgroundStyle } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import getBackgroundStyle from "../../utils/getBackgroundStyle";
import getBackground from "../../utils/getBackground";
import getTextStyle from "../../utils/getTextStyle";

type MainColorBlockProps = {} & CommonWidgetProps;

const getCustomStyle = (style: IBackgroundStyle) => {
  if (style?.show === true) {
    return {
      background: style.bgColor,
      borderRadius: style.borderRadius && `${style.borderRadius}px`,
      border: style.bgBorder
        ? `${style.bgBorder.width}px ${style.bgBorder.style} ${style.bgBorder.color}`
        : undefined,
    };
  }

  return {};
};
const getEllipsisStyle = (ellipsis?: boolean) => {
  if (ellipsis) {
    return {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    } as CSSProperties;
  }

  return {};
};

export default (props: MainColorBlockProps) => {
  const { widget } = props;

  const {
    filter,
    ellipsis = false,
    textAlign = "left",
    textStyle = {
      color: "#fff",
      fontSize: 24,
      fontFamily: "arial",
      fontWeight: "normal",
    },
    writingMode = "horizontal-tb",
    letterSpacing = 0,
    backgroundStyle = { show: false } as IBackgroundStyle,
  } = widget.props;

  const { content } = widget.props;
  const wrapper = useContext(DatavComWrapperContext);
  useEffect(() => {
    if (wrapper.container?.current) {
      var justifyContent = {
        center: "center",
        left: "horizontal-tb" !== writingMode ? "flex-end" : "flex-start",
        right: "horizontal-tb" !== writingMode ? "flex-start" : "flex-end",
      };

      var style: CSSProperties = {
        ...getBackgroundStyle(widget.props),
        ...getCustomStyle(backgroundStyle),
        ...getEllipsisStyle(ellipsis),
        ...getTextStyle(textStyle),
        letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
        writingMode: writingMode,
        display: "flex",
        alignItems: "center",
        cursor: "default",
        justifyContent: justifyContent[textAlign],
      };
      console.log("style", style);
      Object.entries(style).forEach(([key, value]) => {
        wrapper.container!.current!.style[key] = value;
      });
      // wrapper.container.current.style
    }
  }, []);
  return <span style={{}}>{content}</span>;
};
