---
title: 自定义背景快 # 配置页面标题,同时生成 <title> 标签
order: 0
group: data-v
---

```jsx
/**
 * background: '#f6f7f9'
 */

import { AbsoluteContainer, BgBox, Stage, Display } from "@q25a25q/data-v";

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
      <BgBox
        widget={{
          common: {},
          attr: { w: 100, h: 100, x: 10, y: 10 },
          props: {
            border: {
              flat: {
                color: "#008bff",
                curve: "polyline",
                style: "solid",
                width: 2,
              },
            },
          },
        }}
      ></BgBox>
    </AbsoluteContainer>
  </Stage>
);
```
