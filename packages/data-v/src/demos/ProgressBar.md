---
title: 进度条 # 配置页面标题,同时生成 <title> 标签
order: 0
group: data-v
---

```jsx
/**
 * background: '#f6f7f9'
 */

import {
  AbsoluteContainer,
  ProgressBar,
  Stage,
  Display,
} from "@q25a25q/data-v";

export default () => (
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
      <ProgressBar
        widget={{
          id: "ProgressBar",
          attr: { w: 100, h: 4, x: 10, y: 10 },
          props: {
            radius: 12,
            backgroundColor: "rgb(255 255 255 / 10%)",
            progressColor: "linear-gradient(270deg, rgb(235, 0, 0) 0%, rgba(33, 190, 118, 0) 100%)",
            point: {
              show:true,
              size: 4,
              color:'#fff',
              boxShadow:'0px 0px 4px 1px rgba(33,190,118,0.8)',
            },
          },
           dataConfig: {
              source: {
                name: "数据接口",
                handler: "render",
                useFilter: false,
                dataSource: {
                  multiple: {
                    api: {},
                    $type: "static",
                    static: [{ value: 46 }],
                    $iterator: false,
                  },
                },
                dataRequire: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["value"],
                    properties: {
                      value: {
                        type: ["number"],
                        extension: {
                          description: "数值",
                        },
                      },
                    },
                  },
                },
                description: "数据接口",
                dataSourceType: "multiple",
              },
            },
        }}
      ></ProgressBar>
    </AbsoluteContainer>
  </Stage>
);
```
