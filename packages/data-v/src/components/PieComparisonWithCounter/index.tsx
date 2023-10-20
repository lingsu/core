import { useContext } from "react";
import { CommonWidgetProps } from "../../typing";
import _ from "lodash";
import ReactECharts from "echarts-for-react";

export type PieComparisonWithCounterType = {
  chart?: IChart;
  labels?: ILabels;
  series?: ISeries;
  animation?: IAnimation;
  container?: IContainer;
};
export type IChart = {
  color?: string;
  margin?: IMargin;
  radius?: number;
  "font-size"?: number;
  fontWeight?: string;
  angleOffset?: number;
  "decorate-color"?: string;
  "background-color"?: string;
};
export type IMargin = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};
export type ILabels = {
  show?: boolean;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
};
export type ISeries = {
  serie1?: ISerie1;
  serie2?: ISerie2;
};
export type ISerie1 = {
  "serie-color"?: string;
};
export type ISerie2 = {
  "serie-color"?: string;
};
export type IAnimation = {
  show?: boolean;
  animationEasing?: string;
  animationDuration?: number;
  animationDurationUpdate?: number;
};
export type IContainer = {
  padding?: number;
};

const defaultProps = {
  attr: {
    h: 240,
    w: 400,
    x: 882.2303093991181,
    y: 389.05926991455374,
    hUnit: "px",
    wUnit: "px",
    xUnit: "px",
    yUnit: "px",
  },

  name: "pie-comparison-with-counter",
  type: "ui",
  props: {
    chart: {
      color: "#ffffff",
      margin: {
        top: 40,
        left: 40,
        right: 20,
        bottom: 50,
      },
      radius: 1,
      "font-size": 14,
      fontWeight: "normal",
      angleOffset: 0,
      "decorate-color": "rgba(255,255,255,0.1)",
      "background-color": "rgba(1, 1, 1, 0)",
    },
    labels: {
      show: false,
      color: "rgb(144, 160, 174)",
      fontSize: 14,
      fontWeight: "normal",
    },
    series: {
      serie1: {
        "serie-color": "#1b81fe",
      },
      serie2: {
        "serie-color": "#ff6a00",
      },
    },
    animation: {
      show: true,
      animationEasing: "cubicInOut",
      animationDuration: 1000,
      animationDurationUpdate: 300,
    },
    container: {
      padding: 0,
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
      name: "指标对比饼图接口",
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
          required: ["x", "y"],
          properties: {
            x: {
              type: ["string"],
              extension: {
                description: "类目",
              },
            },
            y: {
              type: [],
              extension: {
                description: "值",
              },
            },
          },
        },
        extension: {},
      },
      description: "指标对比饼图接口",
      dataSourceType: "multiple",
    },
  },
  interaction: {
    events: [],
    logicNodes: [],
  },
};

type PieComparisonWithCounterProps = CommonWidgetProps<PieComparisonWithCounterType>;

const PieComparisonWithCounter = (props: PieComparisonWithCounterProps) => {
  const normal = 16;
  const lagged = 16;
  const total = normal + lagged;
  const normalPercent = Math.round(total * 0.02);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ReactECharts
        option={{
          // tooltip: {
          //   trigger: "item",
          // },

          title: {
            text: total.toString(),
            top: "center",
            left: "center",
            textStyle: {
              color: "white",
            },
          },
          series: [
            {
              hoverAnimation: false,
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              // itemStyle: {
              //   borderColor: "#0C0D3F",
              //   borderWidth: 3,
              // },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                {
                  value: lagged,
                  name: "滞后",
                  itemStyle: {
                    color: "rgba(235, 0, 0, 0.30)",
                  },
                },
                {
                  value: normalPercent,
                  name: "滞后",
                  itemStyle: {
                    color: "rgba(235, 0, 0, 0)",
                  },
                },
                {
                  value: normal,
                  name: "正常",
                  itemStyle: {
                    color: "rgba(33, 190, 118, 0.30)",
                  },
                },
                {
                  value: normalPercent,
                  name: "滞后",
                  itemStyle: {
                    color: "rgba(235, 0, 0, 0)",
                  },
                },
              ],
            },
            {
              type: "pie",
              hoverAnimation: false,
              radius: ["70%", "100%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              // itemStyle: {
              //   borderColor: "#0C0D3F",
              //   borderWidth: 3,
              // },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                {
                  value: lagged,
                  name: "滞后",
                  itemStyle: {
                    color: "#EB0000",
                  },
                },
                {
                  value: normalPercent,
                  name: "正常",
                  itemStyle: {
                    color: "rgba(33, 190, 118, 0)",
                  },
                },
                {
                  value: normal,
                  name: "正常",
                  itemStyle: {
                    color: "#21BE76",
                  },
                },
                {
                  value: normalPercent,
                  name: "正常",
                  itemStyle: {
                    color: "rgba(33, 190, 118, 0)",
                  },
                },
              ],
            },
          ],
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

PieComparisonWithCounter.displayName = "PieComparisonWithCounter";
PieComparisonWithCounter.defaultProps = defaultProps;
export default PieComparisonWithCounter;
