---
title: 多行文本 # 配置页面标题,同时生成 <title> 标签
group: react-datav
---

### 图表样式

多行文本是文字组件的一种，支持自定义文本的内容、颜色、段落样式等，能够在可视化应用中展示段落文本内容。


```jsx
/**
 * background: 'black'
 */

import { Preview, Paragraph } from "@q25a25q/react-datav";

const titleProps = {
  content: "多行文本多行文本多行文本多行文本多行文本多行文本多行文本",
  scroll: {
    rate: 0.03,
    duration: 5000,
    overScroll: true,
    isUniformSpeed: false,
  },
  textAlign: "left",
  textStyle: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Microsoft Yahei",
    fontWeight: "normal",
  },
  lineHeight: 36,
  textIndent: 0,
  letterSpacing: 1,
};
export default () => (
  <div style={{ width: 600, height: 300 }}>
    <Preview w={600} h={300} background="black">
      <Paragraph w={200} h={89} x={10} y={100} {...titleProps} />
    </Preview>
  </div>
);
```
