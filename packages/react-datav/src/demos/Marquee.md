---
title: 跑马灯 # 配置页面标题,同时生成 <title> 标签
order: 0
group: react-datav
---

### 图表样式

跑马灯是文字组件的一种，支持自定义文本的内容、颜色、动画效果等，能够将组件中的溢出文本以跑马灯动画的形式展示在可视化应用中。

```jsx
/**
 * background: 'black'
 */

import { Preview, Marquee } from "@q25a25q/react-datav";

const bgBoxProps = {
  w: 100,
  h: 10,
  x: 10,
  y: 10,
  content: "hellow",
};
export default () => (
  <div style={{ width: 300, height: 300, background: "black" }}>
    <Preview w={300} h={300} background="black">
      <Marquee {...bgBoxProps} />
    </Preview>
  </div>
);
```
