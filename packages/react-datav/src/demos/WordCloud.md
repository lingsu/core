---
title: 词云 # 配置页面标题,同时生成 <title> 标签
order: 0
group: react-datav
---

### 图表样式

词云是文字组件的一种，能够以词云的形式在可视化应用中展示较多数量的文本。词云支持自定义文本的内容、颜色、绘制形状等，支持多系列颜色配置，支持根据权重值映射文本大小。

```jsx
/**
 * background: 'black'
 */

import { Preview, WordCloud } from "@q25a25q/react-datav";

const data = [
  {
    name: "心灵奇旅",
    value: 8.9,
  },
  {
    name: "无依之地",
    value: 8.4,
  },
  {
    name: "随风飘散",
    value: 6.9,
  },
  {
    name: "天堂的张望",
    value: 6.2,
  },
  {
    name: "摇滚红与黑",
    value: 8.1,
  },
  {
    name: "一秒钟",
    value: 7.8,
  },
  {
    name: "神奇女侠1984",
    value: 6.3,
  },
  {
    name: "沐浴之王",
    value: 6.3,
  },
  {
    name: "刻在你心底的名字",
    value: 7.1,
  },
  {
    name: "2020去死",
    value: 7.3,
  },
  {
    name: "除暴",
    value: 6.4,
  },
  {
    name: "女人的碎片",
    value: 7.7,
  },
  {
    name: "我和我的家乡",
    value: 7.3,
  },
  {
    name: "疯狂原始人2",
    value: 8.1,
  },
  {
    name: "前程似锦的女孩",
    value: 7.4,
  },
  {
    name: "夺冠",
    value: 7.3,
  },
  {
    name: "行骗天下JP：公主篇",
    value: 7.4,
  },
  {
    name: "信条",
    value: 7.7,
  },
  {
    name: "消失的情人节",
    value: 7.1,
  },
  {
    name: "电话",
    value: 7.6,
  },
  {
    name: "穷途鼠的奶酪梦",
    value: 7.7,
  },
  {
    name: "在回家之后重新开始",
    value: 6.6,
  },
  {
    name: "鬼灭之刃 剧场版 无限列车篇",
    value: 8.4,
  },
  {
    name: "酒精计划",
    value: 7.5,
  },
  {
    name: "末日逃生",
    value: 5.6,
  },
  {
    name: "芝加哥七君子审判",
    value: 8.6,
  },
  {
    name: "八佰",
    value: 7.6,
  },
  {
    name: "菊石",
    value: 7.1,
  },
  {
    name: "玫瑰岛的不可思议的历史",
    value: 8,
  },
  {
    name: "金刚川",
    value: 6.5,
  },
  {
    name: "1/2的魔法",
    value: 7.7,
  },
  {
    name: "风平浪静",
    value: 6.3,
  },
  {
    name: "无声",
    value: 7.3,
  },
  {
    name: "姜子牙",
    value: 6.8,
  },
  {
    name: "狼行者",
    value: 8,
  },
  {
    name: "砍人快乐",
    value: 6.1,
  },
  {
    name: "米纳里",
    value: 7.2,
  },
  {
    name: "馗降：粽邪2",
    value: 5.9,
  },
  {
    name: "陈翔六点半之民间高手",
    value: 6.4,
  },
  {
    name: "哆啦A梦：大雄的新恐龙",
    value: 7.5,
  },
  {
    name: "逃走的女人",
    value: 7.2,
  },
  {
    name: "曼克",
    value: 7.4,
  },
  {
    name: "南山的部长们",
    value: 8.1,
  },
  {
    name: "世纪大劫案",
    value: 7.2,
  },
  {
    name: "担保",
    value: 7.8,
  },
  {
    name: "一点就到家",
    value: 6.7,
  },
  {
    name: "鸣鸟不飞：乌云密布",
    value: 8.2,
  },
  {
    name: "最幸福的季节",
    value: 7.1,
  },
  {
    name: "领袖水准",
    value: 6.8,
  },
  {
    name: "逃跑",
    value: 6.7,
  },
];
const bgBoxProps = {
  w: 600,
  h: 300,
  x: 10,
  y: 10,
  fontFamily: "Microsoft Yahei",
  fontWeight: "normal",
  fontSizeRangeEnd: 34,
  fontSizeRangeStart: 10,
  backgroundColor: "transparent",
  rotateRatio: 0,
  gridSize: 4,
  shape: "diamond",
  color: "random-light",
  data:data,
};
export default () => (
  <div style={{ width: 600, height: 300, background: "black" }}>
    <Preview w={600} h={300} background="black">
      <WordCloud {...bgBoxProps} />
    </Preview>
  </div>
);
```
