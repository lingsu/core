import { CSSProperties, useContext, useEffect } from "react";
import { CommonWidgetProps, DatavConfig, IBackgroundStyle } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import getBackgroundStyle from "../../utils/getBackgroundStyle";
import getBackground from "../../utils/getBackground";
import getTextStyle from "../../utils/getTextStyle";
import _ from "lodash";

type MainTitleProps = {} & CommonWidgetProps;

const defaultProps = {
  attr: {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    deg: 0,
    hUnit: "px",
    wUnit: "px",
    xUnit: "px",
    yUnit: "px",
  },
  list: [],
  name: "main-title",
  type: "ui",
  props: {
    content: "我是标题数据",
    ellipsis: false,
    textAlign: {
      horiAlign: "center",
      vertiAlign: "center",
    },
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
  },
  common: {
    hide: false,
    flipH: false,
    flipV: false,
    degree: 0,
    filter: {
      hue: 0,
      enable: false,
      opacity: 100,
      contrast: 100,
      saturate: 100,
      brightness: 100,
    },
    opacity: 1,
    transform: {
      scale3d: {
        x: 1,
        y: 1,
        z: 1,
        lock: false,
      },
      rotate3d: {
        deg: 30,
        axis: "y",
      },
      translate3d: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  },
  dataConfig: {
    source: {
      name: "数据接口",
      handler: "render",
      dataSource: {
        multiple: {
          $type: "static",
        },
      },
      dataRequire: {
        type: "array",
        items: {
          type: "object",
          required: [],
          properties: {
            url: {
              type: ["string"],
              extension: {
                description: "超链接地址",
              },
            },
            value: {
              type: ["string", "number"],
              extension: {
                description: "值",
              },
            },
          },
        },
        extension: {},
      },
      description: "数据接口",
      dataSourceType: "multiple",
    },
  },
  interaction: {
    events: [],
    logicNodes: [],
  },
};

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

const MainTitle = (props: MainTitleProps) => {
  const { widget } = props;

  const weightProps = _.merge({}, defaultProps.props, widget!.props);
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
    content,
  } = weightProps;

  const wrapper = useContext(DatavComWrapperContext);
  useEffect(() => {
    if (wrapper.container?.current) {
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
        wrapper.container!.current!.style[key] = value;
      });
      // wrapper.container.current.style
    }
  }, []);
  return <span style={{}}>{content}</span>;
};

MainTitle.displayName = "MainTitle";
MainTitle.defaultProps = defaultProps;
export default MainTitle;
