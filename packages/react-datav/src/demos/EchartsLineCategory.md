---
title: Echarts 基本折线图 # 配置页面标题,同时生成 <title> 标签
order: 0
group: react-datav
---

### 图表样式

本文介绍 Echarts 基本折线图的图表样式和配置面板的功能。

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

import { Preview, EchartsLineCategory } from "@q25a25q/react-datav";

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
  w: 550,
  h: 350,
  x: 10,
  y: 10,
  option: {
    grid: {
      top: 60,
      left: 40,
      right: 20,
      bottom: 50,
    },
    xAxis: {
      z: 0,
      show: true,
      name: null,
      type: "category",
      silent: false,
      zlevel: 0,
      inverse: false,
      nameGap: 4,
      axisLine: {
        show: true,
        onZero: true,
        lineStyle: {
          type: "solid",
          color: "rgba(255, 255, 255, 0.2)",
          width: 1,
          opacity: 0.2,
        },
      },
      axisTick: {
        show: true,
        inside: false,
        length: 8,
        lineStyle: {
          type: "solid",
          color: "#ffffff",
          width: 1,
          opacity: 0.3,
        },
        alignWithLabel: true,
      },
      position: "bottom",
      axisLabel: {
        show: true,
        color: "rgba(255, 255, 255, 0.5)",
        inside: false,
        margin: 18,
        rotate: 0,
        format: "auto",
        fontSize: 10,
        interval: 6,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
        showMaxLabel: null,
        showMinLabel: null,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "solid",
          color: "#ffffff",
          width: 1,
          opacity: 0.2,
        },
      },
      nameRotate: 0,
      boundaryGap: true,
      nameLocation: "end",
      nameTextStyle: {
        color: new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [
          { offset: 0, color: "#00ff95" },
          { offset: 1, color: "rgba(88, 142, 233, 0.5)" },
        ]),
        fontSize: 12,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
    },
    yAxis: {
      z: 0,
      max: null,
      min: null,
      show: true,
      _name: null,
      type: "value",
      scale: false,
      silent: false,
      zlevel: 0,
      inverse: false,
      nameGap: 30,
      axisLine: {
        show: true,
        onZero: true,
        lineStyle: {
          type: "solid",
          color: "rgba(255, 255, 255, 0.2)",
          width: 1,
          opacity: 1,
        },
      },
      axisTick: {
        show: true,
        inside: false,
        length: 8,
        lineStyle: {
          type: "solid",
          color: "#ffffff",
          width: 1,
          opacity: 0.4,
        },
      },
      position: "left",
      axisLabel: {
        show: true,
        color: "#ffffff",
        inside: false,
        margin: 15,
        rotate: 0,
        fontSize: 10,
        fontStyle: "normal",
        formatter: "{value}",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
        showMaxLabel: null,
        showMinLabel: null,
      },
      splitLine: {
        show: false,
        lineStyle: {
          type: "dashed",
          color: "#ffffff",
          width: 1,
          opacity: 0.2,
        },
      },
      nameRotate: 0,
      maxInterval: 500,
      minInterval: 0,
      splitNumber: 4,
      nameLocation: "end",
      nameTextStyle: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 12,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
    },
    legend: {
      top: "auto",
      left: "center",
      show: true,
      orient: "horizontal",
      itemGap: 30,
      padding: 15,
      textStyle: {
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: 10,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
    },
    series: [
      {
        name: "系列1",
        step: false,
        type: "line",
        label: {
          show: true,
          color: "#fff",
          rotate: 0,
          distance: 1,
          fontSize: 13,
          position: "top",
          fontStyle: "normal",
          fontFamily: "Microsoft Yahei",
          fontWeight: "normal",
        },
        smooth: 0.5,
        symbol: "diamond",
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [
            { offset: 0, color: "rgb(10, 115, 255)" },
            { offset: 1, color: "rgba(0, 0, 0, 0)" },
          ]),
          opacity: 1,
        },
        itemStyle: {
          color: "#00ceff",
          opacity: 1,
        },
        lineStyle: {
          type: "solid",
          color: new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [
            { offset: 0, color: "#00efff" },
            { offset: 1, color: "#0047f5" },
          ]),
          width: 2,
          opacity: 1,
        },
        showSymbol: true,
        symbolSize: 8,
        symbolRotate: 0,
        hoverAnimation: true,
        legendHoverLink: true,
        coordinateSystem: "cartesian2d",
      },
    ],
    tooltip: {
      show: true,
      trigger: "item",
      textStyle: {
        color: "#fff",
        fontSize: 12,
        fontStyle: "normal",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
      axisPointer: {
        snap: false,
        type: "line",
        lineStyle: {
          type: "solid",
          color: "#333",
          width: 1,
          opacity: 1,
        },
        crossStyle: {
          type: "dashed",
          color: "#555",
          width: 1,
          opacity: 1,
        },
        shadowStyle: {
          color: "rgba(150,150,150,0.3)",
          opacity: 1,
        },
      },
      backgroundColor: "rgba(50,50,50,0.7)",
    },
    renderer: "svg",
    animation: true,
    animationEasing: "cubicOut",
    animationDuration: 1000,
  },
  data: [
    {
      x: "00:00",
      y: 7,
      s: 1,
    },
    {
      x: "00:30",
      y: 8,
      s: 1,
    },
    {
      x: "01:00",
      y: 8,
      s: 1,
    },
    {
      x: "01:30",
      y: 9,
      s: 1,
    },
    {
      x: "02:00",
      y: 12,
      s: 1,
    },
    {
      x: "02:30",
      y: 10,
      s: 1,
    },
    {
      x: "03:00",
      y: 16,
      s: 1,
    },
    {
      x: "03:30",
      y: 15,
      s: 1,
    },
    {
      x: "04:00",
      y: 14,
      s: 1,
    },
    {
      x: "04:30",
      y: 12,
      s: 1,
    },
    {
      x: "05:00",
      y: 12,
      s: 1,
    },
    {
      x: "05:30",
      y: 13,
      s: 1,
    },
    {
      x: "06:00",
      y: 17,
      s: 1,
    },
    {
      x: "06:30",
      y: 30,
      s: 1,
    },
    {
      x: "07:00",
      y: 19,
      s: 1,
    },
    {
      x: "07:30",
      y: 19,
      s: 1,
    },
    {
      x: "08:00",
      y: 16,
      s: 1,
    },
    {
      x: "08:30",
      y: 26,
      s: 1,
    },
    {
      x: "09:00",
      y: 32,
      s: 1,
    },
    {
      x: "09:30",
      y: 43,
      s: 1,
    },
    {
      x: "10:00",
      y: 55,
      s: 1,
    },
    {
      x: "10:30",
      y: 60,
      s: 1,
    },
    {
      x: "11:00",
      y: 70,
      s: 1,
    },
    {
      x: "11:30",
      y: 60,
      s: 1,
    },
    {
      x: "12:00",
      y: 50,
      s: 1,
    },
    {
      x: "12:30",
      y: 45,
      s: 1,
    },
    {
      x: "13:00",
      y: 39,
      s: 1,
    },
    {
      x: "13:30",
      y: 30,
      s: 1,
    },
    {
      x: "14:00",
      y: 30,
      s: 1,
    },
    {
      x: "14:30",
      y: 30,
      s: 1,
    },
    {
      x: "15:00",
      y: 30,
      s: 1,
    },
    {
      x: "15:30",
      y: 29,
      s: 1,
    },
    {
      x: "16:00",
      y: 29,
      s: 1,
    },
    {
      x: "16:30",
      y: 25,
      s: 1,
    },
    {
      x: "17:00",
      y: 21,
      s: 1,
    },
    {
      x: "17:30",
      y: 20,
      s: 1,
    },
    {
      x: "18:00",
      y: 15,
      s: 1,
    },
    {
      x: "18:30",
      y: 13,
      s: 1,
    },
    {
      x: "19:00",
      y: 16,
      s: 1,
    },
    {
      x: "19:30",
      y: 17,
      s: 1,
    },
    {
      x: "20:00",
      y: 12,
      s: 1,
    },
    {
      x: "20:30",
      y: 13,
      s: 1,
    },
    {
      x: "21:00",
      y: 13,
      s: 1,
    },
    {
      x: "21:30",
      y: 17,
      s: 1,
    },
    {
      x: "22:00",
      y: 15,
      s: 1,
    },
    {
      x: "22:30",
      y: 13,
      s: 1,
    },
    {
      x: "23:00",
      y: 12,
      s: 1,
    },
    {
      x: "23:30",
      y: 12,
      s: 1,
    },
  ],
};
export default () => (
  <div style={{ width: 600, height: 300, background: "black" }}>
    <Preview w={600} h={300} background="black">
      <EchartsLineCategory {...props} />
    </Preview>
  </div>
);
```
