---
title: 指标对比饼图 # 配置页面标题,同时生成 <title> 标签
order: 0
group: data-v
---

```jsx
/**
 * background: '#f6f7f9'
 */
import { useState } from "react";
import {
  AbsoluteContainer,
  PieComparisonWithCounter,
  Stage,
  Display,
} from "@q25a25q/data-v";

const defaultProps = {
  id: "pie-comparison-with-counter_bm1km",
  attr: {
    h: 200,
    w: 200,
    x: 0,
    y: 0,
    hUnit: "px",
    wUnit: "px",
    xUnit: "px",
    yUnit: "px",
  },
  list: [],
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
        "serie-color": "#EB0000",
      },
      serie2: {
        "serie-color": "#21BE76",
      },
    },
    innerSeries: {
      show: true,
      serie1: {
        "serie-color": "rgba(235, 0, 0, 0.30)",
      },
      serie2: {
        "serie-color": "rgba(33, 190, 118, 0.30)",
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
            static: [
              { x: "女", y: 1000 },
              { x: "男", y: 2000 },
            ],
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
export default () => {
  const [pieProps, setPieProps] = useState(defaultProps);

  return (
    <Stage>
      <AbsoluteContainer
        widget={{
          props: {
            display: Display.NoScale,
            background: { type: "flat", value: "#262626" },
          },
          attr: { w: 300, h: 300 },
        }}
      >
        <PieComparisonWithCounter
          widget={pieProps}
        ></PieComparisonWithCounter>
      </AbsoluteContainer>
    </Stage>
  );
};
```
