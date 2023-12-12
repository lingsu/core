---
title: 通用标题 # 配置页面标题,同时生成 <title> 标签
group: react-datav
---

### 图表样式

支持自定义标题的内容、位置、颜色、超链接等，支持在可视化应用中添加多个通用标题组件，展示可视化应用和可视化应用中各个模块的标题。

### 基础参数

| 参数       | 说明     | 类型      | 默认值               | 版本  |
| ---------- | -------- | --------- | -------------------- | ----- |
| width      | 宽度     | number    | -                    | 0.0.1 |
| height     | 高度     | number    | -                    | 0.0.1 |
| background | 背景颜色 | `string`  | -                    | 0.0.1 |

```jsx
/**
 * background: 'black'
 */

import { Preview, MainTitle } from "@q25a25q/react-datav";

const titleProps = {
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
};
export default () => (
  <div style={{ width: 600, height: 300 }}>
    <Preview w={600} h={300} background="black">
      <MainTitle w={400} h={24} x={10} y={100} {...titleProps} />
    </Preview>
  </div>
);
```
