---
title: 数字翻牌器 # 配置页面标题,同时生成 <title> 标签
order: 0
group: data-v
---

### 数字翻牌器

本文介绍色块组件的图表样式和各配置项的含义。

```jsx
/**
 * background: '#f6f7f9'
 */

import { NumberTitleFlop, Stage, Display } from "@q25a25q/data-v";

export default () => (
  <Stage>
    <NumberTitleFlop
      widget={{
        common: {},
        attr: { w: 400, h: 50, x: 0, y: 0 },
        props: {
          title: {
            content: "Typesomething",
            textStyle: {
              color: "#597EF7",
              fontSize: 18,
              textAlign: "flex-start",
              fontWeight: "normal",
            },
          },
          global: {
            distance: 0,
            textStyle: { fontFamily: "Microsoft Yahei" },
            arrangement: "top",
            abnormalData: "0",
            initShowData: "0",
          },
          counter: {
            margin: { preNum: 0, numSuff: 0 },
            prefix: {
              content: "￥",
              textStyle: {
                color: "#85A5FF",
                fontSize: 36,
                fontFamily: "Microsoft Yahei",
                fontWeight: "bolder",
              },
            },
            suffix: {
              content: "R",
              textStyle: {
                color: "#85A5FF",
                fontSize: 30,
                fontFamily: "Microsoft Yahei",
                fontWeight: "bolder",
              },
              suffixArrange: "baseline",
            },
            numbers: {
              digit: 0,
              decimal: 2,
              duration: 1000,
              rounding: true,
              animation: true,
              increment: false,
              textStyle: {
                color: { type: "flat", value: "#85A5FF" },
                fontSize: 36,
                fontWeight: "bolder",
              },
              fixedWidth: 0,
              marginRight: 0,
              sameDataFlip: false,
              decimalSymbol: ".",
              backgroundColor: { type: "flat", value: "#202020" },
              separatingChart: true,
              backgroundRadius: 0,
              separatingSymbol: ",",
              separatingBackground: false,
            },
            fontFamily: "Microsoft Yahei",
            justifyContent: "flex-start",
          },
          interaction: { cursor: false },
        },
      }}
    ></NumberTitleFlop>
  </Stage>
);
```
