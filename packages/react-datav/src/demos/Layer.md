---
title: 图层 # 配置页面标题,同时生成 <title> 标签
group: react-datav
---

### 组容器

全屏容器将根据屏幕比例及当前浏览器窗口大小，根据 `display` 自动进行缩放处理

### 基础参数

| 参数       | 说明     | 类型      | 默认值               | 版本  |
| ---------- | -------- | --------- | -------------------- | ----- |
| width      | 宽度     | number    | -                    | 0.0.1 |
| height     | 高度     | number    | -                    | 0.0.1 |
| background | 背景颜色 | `string`  | -                    | 0.0.1 |
| display    | 缩放模式 | `Display` | Display.ScaleByWidth | 0.0.1 |

```jsx
/**
 * background: '#f6f7f9'
 */

import { Preview, Layer } from "@q25a25q/react-datav";

export default () => (
  <div style={{ width: 250, height: 300, background: "green" }}>
    <Preview w={300} h={300} background="red">
      <Layer w={100} h={100} x={100} y={100}>
        <div style={{ width: '100%', height: '100%', background: "blue" }}></div >
      </Layer>
    </Preview>
  </div>
);
```
