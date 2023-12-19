---
title: Echarts 柱状图 # 配置页面标题,同时生成 <title> 标签
order: 0
group: react-datav
---

### 图表样式

Echarts 柱状图能够清晰智能地展示各类别之间以及各类别内部的数据差异，在可视化应用中所占空间较大。

```jsx
/**
 * background: 'black'
 */

import * as echarts from "echarts/core";
import {
  BarChart,
  LineChart,
  MapChart,
  PieChart,
  PictorialBarChart,
  ScatterChart,
} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  ToolboxComponent,
  VisualMapComponent,
  LegendComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from "echarts/charts";
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";

import { Preview, EchartsBarAnimationDelay } from "@q25a25q/react-datav";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  ScatterChart,
  PictorialBarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  SVGRenderer,
  ToolboxComponent,
  VisualMapComponent,
  LegendComponent,
]);

const props = {
  w: 450,
  h: 250,
  x: 10,
  y: 10,
  option: {
    grid: {
      top: "16%",
      left: "12%",
      show: true,
      right: "6%",
      width: "auto",
      bottom: "15%",
      height: "auto",
      borderColor: "#ccc",
      borderWidth: 0,
      containLabel: false,
      backgroundColor: "rgba(0,0,0,0)",
    },
    xAxis: {
      max: "dataMax",
      min: "dataMin",
      show: true,
      scale: true,
      tName: "",
      offset: 0,
      silent: false,
      inverse: false,
      logBase: 10,
      nameGap: 15,
      axisLine: {
        show: false,
        onZero: true,
        lineStyle: {
          color: "rgba(255,255,255,.8)",
          sType: "solid",
          width: 1,
          opacity: 1,
        },
      },
      axisTick: {
        show: false,
        inside: false,
        length: 6,
        interval: 6,
        lineStyle: {
          color: "#ffffff",
          sType: "solid",
          width: 1,
          opacity: 0.5,
        },
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        inside: false,
        margin: 25,
        rotate: 0,
        interval: 13,
        textStyle: {
          align: "",
          color: "rgba(255, 255, 255, 0.5)",
          baseline: "bottom",
          fontSize: 10,
          fontStyle: "normal",
          fontFamily: "Microsoft Yahei",
          fontWeight: "normal",
        },
        showMaxLabel: true,
        showMinLabel: true,
      },
      splitArea: {
        show: false,
        interval: 0,
        areaStyle: {
          opacity: 1,
        },
      },
      splitLine: {
        show: true,
        interval: 13,
        lineStyle: {
          sType: "solid",
          width: 1,
          opacity: 0.2,
        },
      },
      nameRotate: 0,
      axisPointer: {
        show: true,
        snap: false,
        lType: "shadow",
        label: {
          show: false,
          margin: 3,
          precision: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 10,
            fontStyle: "normal",
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
          },
          borderColor: "#333",
          borderWidth: 0,
          backgroundColor: "rgba(50,50,50,0.7)",
        },
        value: 0,
        handle: {
          show: false,
          size: 45,
          color: "#333",
          margin: 50,
          throttle: 40,
        },
        status: false,
        lineStyle: {
          color: "rgba(0,0,0,0)",
          sType: "solid",
          width: 1,
          opacity: 1,
        },
        shadowStyle: {
          color: "rgba(150,150,150,0.3)",
          opacity: 1,
        },
      },
      boundaryGap: true,
      minInterval: 0,
      splitNumber: 5,
      nameLocation: "middle",
      nameTextStyle: {
        color: "rgba(0,0,0,0)",
        fontSize: 10,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
    },
    yAxis: {
      max: "150",
      min: "dataMin",
      show: true,
      scale: false,
      tName: "",
      offset: 0,
      silent: false,
      inverse: false,
      logBase: 10,
      nameGap: 15,
      axisLine: {
        show: false,
        onZero: true,
        lineStyle: {
          color: "rgba(255,255,255,.8)",
          sType: "solid",
          width: 1,
          opacity: 1,
        },
      },
      axisTick: {
        show: true,
        inside: false,
        length: 6,
        interval: 0,
        lineStyle: {
          color: "rgba(255, 255, 255, 0.5)",
          sType: "solid",
          width: 1,
          opacity: 1,
        },
        alignWithLabel: false,
      },
      interval: 0,
      axisLabel: {
        show: true,
        inside: false,
        margin: 15,
        rotate: 0,
        interval: 0,
        textStyle: {
          align: "",
          color: "#ffffff",
          baseline: "middle",
          fontSize: 9,
          fontStyle: "normal",
          fontFamily: "Microsoft Yahei",
          fontWeight: "normal",
        },
        showMaxLabel: null,
        showMinLabel: null,
      },
      splitArea: {
        show: false,
        interval: 0,
        areaStyle: {
          opacity: 1,
        },
      },
      splitLine: {
        show: false,
        interval: 0,
        lineStyle: {
          sType: "solid",
          width: 1,
          opacity: 0.1,
        },
      },
      nameRotate: 0,
      axisPointer: {
        show: true,
        snap: false,
        label: {
          show: true,
          margin: 3,
          precision: 0,
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 10,
            fontStyle: "normal",
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
          },
          borderColor: "#000000",
          borderWidth: 2,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
        sType: "line",
        value: 0,
        handle: {
          show: false,
          size: 45,
          color: "#333",
          margin: 50,
          throttle: 40,
        },
        status: false,
        lineStyle: {
          color: "rgba(0,0,0,0)",
          sType: "solid",
          width: 1,
          opacity: 1,
        },
        shadowStyle: {
          color: "rgba(150,150,150,0.3)",
          opacity: 1,
        },
      },
      boundaryGap: true,
      minInterval: 0,
      splitNumber: 5,
      nameLocation: "end",
      nameTextStyle: {
        color: "rgba(0,0,0,0)",
        fontSize: 10,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
    },
    legend: {
      top: "auto",
      left: "42%",
      show: true,
      align: "left",
      right: "auto",
      width: "auto",
      bottom: "auto",
      height: "auto",
      orient: "horizontal",
      itemGap: 30,
      padding: 5,
      itemWidth: 4,
      textStyle: {
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: 10,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
      itemHeight: 12,
      borderColor: "#ccc",
      borderWidth: 0,
      selectedMode: true,
      inactiveColor: "#ccc",
      backgroundColor: "rgba(0,0,0,0)",
    },
    series: [
      {
        name: "bar",
        type: "bar",
        label: {
          normal: {
            show: false,
            textStyle: {
              color: "#ffffff",
              fontSize: 10,
              fontStyle: "normal",
              fontFamily: "Microsoft Yahei",
              fontWeight: "normal",
            },
          },
          emphasis: {
            show: false,
            textStyle: {
              color: "#ffffff",
              fontSize: 10,
              fontStyle: "normal",
              fontFamily: "Microsoft Yahei",
              fontWeight: "normal",
            },
          },
        },
        stack: "",
        barGap: "40%",
        silent: false,
        _active: false,
        barWidth: "40%",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [
            { offset: 0, color: "rgb(0, 255, 149)" },
            { offset: 1, color: "rgba(88, 142, 233, 0.5)" },
          ]),
        
            opacity: 0.8,
            borderType: "solid",
            borderColor: "#000",
            borderWidth: 0,
            barBorderRadius: 2,
          },
          emphasis: {
              color: new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [
            { offset: 0, color: "rgb(0, 255, 149)" },
            { offset: 1, color: "rgba(88, 142, 233, 0.5)" },
          ]),

            opacity: 1,
            borderType: "solid",
            borderColor: "#000",
            borderWidth: 0,
          },
        },
        barMinHeight: 0,
        barCategoryGap: "40%",
        legendHoverLink: true,
        coordinateSystem: "cartesian2d",
      },
      {
        name: "bar2",
        type: "bar",
        label: {
          normal: {
            show: false,
            textStyle: {
              color: "#000",
              fontSize: 10,
              fontStyle: "normal",
              fontFamily: "sans-serif",
              fontWeight: "normal",
            },
          },
          emphasis: {
            show: false,
            textStyle: {
              color: "#000",
              fontSize: 10,
              fontStyle: "normal",
              fontFamily: "sans-serif",
              fontWeight: "normal",
            },
          },
        },
        stack: "",
        barGap: "40%",
        silent: false,
        _active: true,
        barWidth: "40%",
        itemStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [
            { offset: 0, color: "rgb(0, 132, 251)" },
            { offset: 1, color: "rgba(0, 62, 255, 0.99)" },
          ]),

            opacity: 0.8,
            borderType: "solid",
            borderColor: "#000",
            borderWidth: 0,
            barBorderRadius: 0,
          },
          emphasis: {
              color: new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [
            { offset: 0, color: "#d1e3ff" },
            { offset: 1, color: "rgba(114, 153, 204, 0.3)" },
          ]),

            opacity: 1,
            borderType: "solid",
            borderColor: "#000",
            borderWidth: 0,
          },
        },
        barMinHeight: 0,
        barCategoryGap: "40%",
        legendHoverLink: true,
        coordinateSystem: "cartesian2d",
      },
    ],
    tooltip: {
      show: true,
      padding: 5,
      trigger: "axis",
      textStyle: {
        color: "#ffffff",
        fontSize: 12,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
      triggerOn: "mousemove",
      borderColor: "#333",
      borderWidth: 0,
      backgroundColor:  "rgba(50,50,50,0.7)",
    },
    animation: true,
    animationEasing: "cubicOut",
    animationDuration: 1000,
    animationThreshold: 2000,
    renderer: "svg",
    animation: true,
    animationEasing: "cubicOut",
    animationDuration: 1000,
  },
  data: [
  {
    "x": "类目0",
    "y": 0,
    "s": "bar"
  },
  {
    "x": "类目0",
    "y": 50,
    "s": "bar2"
  },
  {
    "x": "类目1",
    "y": 8.901463875624668,
    "s": "bar"
  },
  {
    "x": "类目1",
    "y": 47.18992898088751,
    "s": "bar2"
  },
  {
    "x": "类目2",
    "y": 17.025413764148556,
    "s": "bar"
  },
  {
    "x": "类目2",
    "y": 42.54426104547181,
    "s": "bar2"
  }
  ],
};
export default () => (
  <div style={{ width: 600, height: 300, background: "black" }}>
    <Preview w={600} h={300} background="black">
      <EchartsBarAnimationDelay {...props} />
    </Preview>
  </div>
);
```
