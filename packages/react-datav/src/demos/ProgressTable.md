---
title: 进度条表格 # 配置页面标题,同时生成 <title> 标签
group: react-datav
---

### 图表样式

进度条表格是由进度条和表格组成的组件，支持配置表格、表格列和翻页器的样式。

```jsx
/**
 * background: '#262626'
 */

import { Preview, ProgressTable } from "@q25a25q/react-datav";

const props = {
  format: "yyyy-MM-dd HH:mm:ss",
  textStyle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Microsoft Yahei",
    fontWeight: "normal",
  },
};
export default () => (
  <div style={{ width: 600, height: 300 }}>
    <Preview w={600} h={300} background="#262626">
      <ProgressTable w={400} h={200} x={10} y={100} {...props} />
    </Preview>
  </div>
);
```
