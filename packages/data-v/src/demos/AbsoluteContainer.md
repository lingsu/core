---
title: 组容器 # 配置页面标题,同时生成 <title> 标签
order: 0
group: data-v
---

### 组容器

全屏容器将根据屏幕比例及当前浏览器窗口大小，根据 `display` 自动进行缩放处理

### 基础参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 宽度 | number | - | 0.0.1 |
| height | 高度 | number | - | 0.0.1 |
| rotate | 旋转的角度，单位 ° | number | 0 | 0.0.1 |
| image | 背景图片源，建议导出 2 倍或 3 倍图 | `string` | - | 0.0.1 |
| display | 缩放模式 | `Display` | Display.ScaleByWidth | 0.0.1 |
| zIndex | 元素的 z-index | number | 0 | 0.0.1 |

```jsx | pure
<AbsoluteContainer width={1920} height={1080} display={Display.ScaleByWidth}>content</AbsoluteContainer>
```