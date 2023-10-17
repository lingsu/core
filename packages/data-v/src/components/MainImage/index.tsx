import { CSSProperties, useContext, useEffect } from "react";
import { CommonWidgetProps } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import _ from "lodash";

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
  name: "main-img",
  type: "ui",
  props: {
    cursor: true,
    radius: 0,
    repeat: "no-repeat",
    imageType: "bitmap",
    urlConfig: {
      url: "",
      ifBlank: false,
    },
    vectorFill: "#2483FF",
    "inner-style": {},
    vectorImage:
      "https://img.alicdn.com/imgextra/i3/O1CN01I75Td61VcHWaI0C0V_!!6000000002673-55-tps-128-128.svg",
    "background-image":
      "https://img.alicdn.com/tfs/TB1J3GkgeH2gK0jSZJnXXaT1FXa-600-360.png",
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
            img: {
              type: ["string"],
              extension: {
                name: "图片路径",
                description: "可以为空,从配置读取",
              },
            },
            url: {
              type: ["string"],
              extension: {
                description: "超链接地址",
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
const MainImage = (props: CommonWidgetProps) => {
  const { widget } = props;
  const weightProps = _.merge({}, defaultProps.props, widget!.props);

  const { backgroundImage, repeat, radius, cursor, urlConfig } = weightProps;
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
      // console.log("style", style);
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

MainImage.displayName = "MainImage";
MainImage.defaultProps = defaultProps;
export default MainImage;
