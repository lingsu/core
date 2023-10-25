import { useContext } from "react";
import { CommonWidgetProps } from "../../typing";
import _ from "lodash";
import ReactECharts from "echarts-for-react";
import { DatavDataSourceContext } from "../DatavCommonHoc/context";

export type PieComparisonWithCounterType = {
  chart?: IChart;
  labels?: ILabels;
  series?: ISeries;
  innerSeries?: ISeries & { show?: boolean };
  animation?: IAnimation;
  container?: IContainer;
  statistic?: Statistic;
};
export type Statistic = {
  statisticText?: IStatisticText;
};
export type IStatisticText = {
  show: boolean;
  title: string;
  titleOffset: ITitleOffset;
  contentOffset: IContentOffset;
  statisticDesc: IStatisticDesc;
  staTitleTextStyle: IStaTitleTextStyle;
  staContentTextStyle: IStaContentTextStyle;
};
export type ITitleOffset = {
  offsetX: number;
  offsetY: number;
};
export type IContentOffset = {
  offsetX: number;
  offsetY: number;
};
export type IStatisticDesc = {
  statPrefix: string;
  statSuffix: string;
};
export type IStaTitleTextStyle = {
  color: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
};
export type IStaContentTextStyle = {
  color: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
};
export type IStatisticImage = {
  show: boolean;
  imageSrc: string;
  imageStyle: IImageStyle;
  imageOffset: IImageOffset;
};
export type IImageStyle = {
  width: number;
  height: number;
  opacity: number;
  borderRadius: number;
};
export type IImageOffset = {
  offsetX: number;
  offsetY: number;
  positionX: number;
  positionY: number;
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
  serie1?: ISerie;
  serie2?: ISerie;
};
export type ISerie = {
  "serie-color"?: string;
  radiusGroup?: {
    innerRadius: number;
    outerRadius: number;
  };
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
    h: 100,
    w: 100,
    x: 0,
    y: 0,
    hUnit: "px",
    wUnit: "px",
    xUnit: "px",
    yUnit: "px",
  },
  props: {
    chart: {
      color: "#ffffff",
      // margin: {
      //   top: 40,
      //   left: 40,
      //   right: 20,
      //   bottom: 50,
      // },
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
    statistic: {
      statisticText: {
        show: true,
        title: "",
        titleOffset: {
          offsetX: 0,
          offsetY: 0,
        },
        contentOffset: {
          offsetX: 0,
          offsetY: 0,
        },
        statisticDesc: {
          statPrefix: "",
          statSuffix: "",
        },
        staTitleTextStyle: {
          color: "#ddd",
          fontSize: 16,
          fontFamily: "Microsoft Yahei",
          fontWeight: "normal",
        },
        staContentTextStyle: {
          color: "#ddd",
          fontSize: 40,
          fontFamily: "Microsoft Yahei",
          fontWeight: "normal",
        },
      },
    },
    series: {
      radiusGroup: {
        innerRadius: 70,
        outerRadius: 100,
      },
      serie1: {
        "serie-color": "#1b81fe",
      },
      serie2: {
        "serie-color": "#ff6a00",
      },
    },
    innerSeries: {
      show: false,
      radiusGroup: {
        innerRadius: 50,
        outerRadius: 70,
      },
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

type PieComparisonWithCounterProps =
  CommonWidgetProps<PieComparisonWithCounterType>;

const PieComparisonWithCounter = (props: PieComparisonWithCounterProps) => {

  const dataSource = useContext(DatavDataSourceContext);
  const series1 = dataSource.data[0];
  const series2 = dataSource.data[1];


  const total = series1.y + series2.y;
  const percent = Math.round(total * 0.02);


  const { widget } = props;
  const weightProps = _.merge({}, defaultProps.props, widget.props);

  const { series, innerSeries, statistic} = weightProps;


  const eChartsOption = {
    // tooltip: {
    //   trigger: "item",
    // },

    title: statistic.statisticText.show ? {
      text: total.toString(),
      top: "center",
      left: "center",
      textStyle: {
        color: "white",
      },
    }: undefined,
    series: [
      innerSeries.show
        ? {
            hoverAnimation: false,
            type: "pie",
            radius: [
              innerSeries.radiusGroup.innerRadius + "%",
              innerSeries.radiusGroup.outerRadius + "%",
            ],
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
                value: series1.y,

                itemStyle: {
                  color: innerSeries.serie1["serie-color"],
                },
              },
              series1.y> 0 && series2.y > 0 ?
              {
                value: percent,

                itemStyle: {
                  color: "rgba(235, 0, 0, 0)",
                },
              }: null,
              {
                value: series2.y,

                itemStyle: {
                  color: innerSeries.serie2["serie-color"],
                },
              },
              series1.y> 0 && series2.y > 0 ?
              {
                value: percent,

                itemStyle: {
                  color: "rgba(235, 0, 0, 0)",
                },
              }: null,
            ],
          }
        : undefined,
      {
        type: "pie",
        hoverAnimation: false,
        radius: [
          series.radiusGroup.innerRadius + "%",
          series.radiusGroup.outerRadius + "%",
        ],
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
            value: series1.y,

            itemStyle: {
              color: series.serie1["serie-color"],
            },
          },
          series1.y> 0 && series2.y > 0 ?
          {
            value: percent,

            itemStyle: {
              color: "rgba(235, 0, 0, 0)",
            },
          }: null,
          {
            value: series2.y,

            itemStyle: {
              color: series.serie2["serie-color"],
            },
          },
          series1.y> 0 && series2.y > 0 ?
          {
            value: percent,

            itemStyle: {
              color: "rgba(235, 0, 0, 0)",
            },
          }: null,
        ],
      },
    ],
  }

  // console.log('eChartsOption',eChartsOption)
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ReactECharts
        option={eChartsOption}
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
