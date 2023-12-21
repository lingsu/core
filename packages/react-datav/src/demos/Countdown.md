---
title: 倒计时 # 配置页面标题,同时生成 <title> 标签
group: react-datav
---

### 图表样式

倒计时是以展示倒计天数及分秒，用于表现倒计时时间样式的组件。


```jsx
/**
 * background: 'black'
 */

import { Preview, Countdown } from "@q25a25q/react-datav";

const props = {
  endTime: "2023-12-21 15:53:30",
 time: {
    padding: 0,
    textStyle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontFamily: "Microsoft Yahei",
      fontWeight: "normal",
    },
  },
  dayUnit: {
    textStyle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontFamily: "Microsoft Yahei",
      fontWeight: "normal",
    },
    marginLeft: 12.5,
    marginRight: 12.5,
  },
  dayNumbers: {
    textStyle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontFamily: "Microsoft Yahei",
      fontWeight: "normal",
    },
  },
};
export default () => (
  <div style={{ width: 600, height: 300 }}>
    <Preview w={600} h={300} background="black">
      <Countdown w={200} h={100} x={10} y={100} {...props} />
    </Preview>
  </div>
);
```
