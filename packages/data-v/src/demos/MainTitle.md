---
title: 标题 # 配置页面标题,同时生成 <title> 标签
order: 0
group: data-v
---

### 色块

本文介绍色块组件的图表样式和各配置项的含义。

### props 参数

| 参数       | 说明 | 类型     | 默认值 | 版本  |
| ---------- | ---- | -------- | ------ | ----- |
| background | 背景 | `string` | -      | 0.0.1 |

### attr 参数

| 参数  | 说明       | 类型   | 默认值 | 版本  |
| ----- | ---------- | ------ | ------ | ----- |
| x     | 横坐标     | number | -      | 0.0.1 |
| y     | 纵坐标     | number | -      | 0.0.1 |
| w     | 宽度       | number | -      | 0.0.1 |
| h     | 高度       | number | -      | 0.0.1 |
| hUnit | 横坐标单位 | string | px     | 0.0.1 |
| wUnit | 纵坐标单位 | string | px     | 0.0.1 |
| xUnit | 宽度单位   | string | px     | 0.0.1 |
| yUnit | 高度单位   | string | px     | 0.0.1 |

### common 参数

| 参数    | 说明                                                    | 类型   | 默认值 | 版本  |
| ------- | ------------------------------------------------------- | ------ | ------ | ----- |
| degree  | 旋转角度：以组件的中心为中心点，进行旋转，单位为度（°） | number | 0      | 0.0.1 |
| opacity | 不透明度：取值范围为 0~1                                | number | 1      | 0.0.1 |

```jsx
/**
 * background: '#f6f7f9'
 */

import { MainTitle, Stage, Display } from "@q25a25q/data-v";

export default () => (
  <Stage>
    <MainTitle
      widget={{
        common: {},
        attr: { w: 400, h: 50, x: 0, y: 0 },
        props: {
          content: "我是标题数据",
          ellipsis: false,
          textAlign: "center",
          textStyle: {
            color: "#fff",
            fontSize: 24,
            fontFamily: "arial",
            fontWeight: "normal",
          },
          writingMode: "horizontal-tb",
          letterSpacing: 20,
          backgroundStyle: {
            show: true,
            bgColor: "#008bff",
            bgBorder: {
              color: "#fff",
              curve: "polyline",
              style: "solid",
              width: 1,
            },
            borderRadius: 10,
          },
        },
      }}
    ></MainTitle>
  </Stage>
);
```
