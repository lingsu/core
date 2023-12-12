---
title: 单张图片
order: 0
group: react-datav
---

### 图表样式

支持自定义图片的 URL 地址和跳转链接，能够为可视化应用和其他组件添加自定义的背景图，使操作更加智能，可视化应用更加美观。

```jsx
/**
 * background: 'black'
 */

import { Preview, MainImage } from "@q25a25q/react-datav";

const props = {
  w: 100,
  h: 100,
  x: 10,
  y: 10,
  "background-image":
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
};
export default () => (
  <div style={{ width: 300, height: 300, background: "black" }}>
    <Preview w={300} h={300} background="black">
      <MainImage {...props} />
    </Preview>
  </div>
);
```
