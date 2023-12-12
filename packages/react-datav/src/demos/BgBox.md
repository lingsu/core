---
title: 自定义背景快 # 配置页面标题,同时生成 <title> 标签
order: 0
group: react-datav
---
### 图表样式

支持自定义背景块的颜色、边框、滤镜效果等，支持为可视化应用或可视化应用的某个模块添加自定义的背景块，能够使可视化应用展示更加美观。

```jsx
/**
 * background: 'black'
 */

import { Preview, BgBox } from "@q25a25q/react-datav";

const bgBoxProps = {
  w: 100,
  h: 100,
  x: 10,
  y: 10,
  border: {
    flat: {
      color: "#008bff",
      curve: "polyline",
      style: "solid",
      width: 2,
    },
  },
};
export default () => (
  <div style={{ width: 300, height: 300, background: "black" }}>
  <Preview w={300} h={300} background="black">
    <BgBox  {...bgBoxProps} />
  </Preview>
  </div>
);
```
