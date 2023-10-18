import { useContext } from "react";
import { CommonWidgetProps } from "../../typing";
import _ from "lodash";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import { DatavDataSourceContext } from "../DatavCommonHoc/context";

const defaultProps = {
  attr: {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    hUnit: "px",
    wUnit: "px",
    xUnit: "px",
    yUnit: "px",
  },
  list: [],
  name: "progress-bar",
  type: "ui",
  props: {
    // backgroundColor:'Background color'
    backgroundColor: "#000",
    progressColor: "#fff",
    point: {
      show: false,
      color: "#fff",
      size: 4,
      boxShadow: undefined,
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

type ProgressBarProps = CommonWidgetProps<Partial<typeof defaultProps.props>>;

const ProgressBar = (props: ProgressBarProps) => {
  // const wrapper = useContext(DatavComWrapperContext);
  const dataSource = useContext(DatavDataSourceContext);
  // console.log("dataSource", dataSource);
  const value = dataSource.data[0].value;

  const { widget } = props;
  const weightProps = _.merge({}, defaultProps.props, widget.props);
  const { backgroundColor, progressColor, radius, point } = weightProps;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor,
        borderRadius: radius,
        position: "relative",
      }}
    >
      {point.show && (<div
        style={{
          position: "absolute",
          height: point.size,
          width: point.size,
          borderRadius: point.size,
          background: point.color,
          boxShadow: point.boxShadow,
          left: `calc(${value}% - ${point.size / 2}px)`,
        }}
      ></div>)}

      <div
        style={{
          width: value + "%",
          height: "100%",
          background: progressColor,
          borderRadius: radius,
        }}
      ></div>
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";
ProgressBar.defaultProps = defaultProps;
export default ProgressBar;
