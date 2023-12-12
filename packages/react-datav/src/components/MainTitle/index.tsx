import { CSSProperties, useContext, useEffect, useMemo } from "react";
import {
  BackgroundStyle,
  LayerOption,
  Position,
  TextStyle,
  UrlConfig,
  Viewport,
} from "../../typing";
import getBackgroundStyle from "../../utils/getBackgroundStyle";
import getBackground from "../../utils/getBackground";
import getTextStyle from "../../utils/getTextStyle";
import _ from "lodash";
import { IBackgroundStyle } from "packages/data-v/src/typing";
import getCustomStyle from "../../utils/getCustomStyle";
import getEllipsisStyle from "../../utils/getEllipsisStyle";
import Layer from "../Layer";

type MainTitleProps = {
  content?: string;
  ellipsis?: boolean;
  cursor?: boolean;
  textAlign?:
    | "center"
    | "end"
    | "justify"
    | "left"
    | "match-parent"
    | "right"
    | "start";
  textStyle?: TextStyle;
  urlConfig?: UrlConfig;
  writingMode?:
    | "horizontal-tb"
    | "sideways-lr"
    | "sideways-rl"
    | "vertical-lr"
    | "vertical-rl";
  letterSpacing?: number;
  backgroundStyle?: BackgroundStyle;
} & LayerOption;

const defaultProps = {
  content: "我是标题数据",
  ellipsis: false,
  textAlign: "left",
  textStyle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "arial",
    fontWeight: "normal",
  },
  urlConfig: {
    url: "",
    ifBlank: false,
  },
  textShadow: [],
  writingMode: "horizontal-tb",
  letterSpacing: 0,
  backgroundStyle: {
    show: false,
    bgColor: "#008bff",
    bgBorder: {
      color: "#fff",
      curve: "polyline",
      style: "solid",
      width: 1,
    },
    borderRadius: 10,
  },
  interaction: {
    events: [],
    logicNodes: [],
  },
};

const MainTitle = (props: MainTitleProps) => {
  const weightProps = _.merge({}, defaultProps, props);
  const {
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
    content,
  } = weightProps;

  const style = useMemo(() => {
    var justifyContent = {
      center: "center",
      left: "horizontal-tb" !== writingMode ? "flex-end" : "flex-start",
      right: "horizontal-tb" !== writingMode ? "flex-start" : "flex-end",
    };

    var style: CSSProperties = {
      ...getBackgroundStyle(weightProps),
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
      style[key] = value;
    });
    // wrapper.container.current.style
    return style;
  }, []);
  return (
    <Layer {...props}>
      <div style={style}>
        <span>{content}</span>
      </div>
    </Layer>
  );
};

MainTitle.displayName = "MainTitle";
MainTitle.defaultProps = defaultProps;
export default MainTitle;
