---
title: 自定义轮播列表 # 配置页面标题,同时生成 <title> 标签
order: 0
group: data-v
---

```jsx
/**
 * background: '#f6f7f9'
 */
import { useState } from "react";
import {
  AbsoluteContainer,
  CustomCarouselTable,
  Stage,
  Display,
} from "@q25a25q/data-v";

const defaultProps = {
  id: "custom-carousel-table_bm1km",
  attr: {
    h: 200,
    w: 200,
    x: 0,
    y: 0,
    hUnit: "px",
    wUnit: "px",
    xUnit: "px",
    yUnit: "px",
  },
  list: [],
  name: "custom-carousel-table",
  type: "ui",
  props: {
    itemRender: (item, index) => {
      return (
        <div style={{ background: "#319cff", paddingBottom: 10 }}>
          {item.name}
        </div>
      );
    },
  },
  dataConfig: {
    source: {
      name: "自定义轮播列表接口",
      handler: "render",
      dataSource: {
        multiple: {
          static: [{ name: "女" }, { name: "男" }],
          $type: "static",
        },
      },
      description: "自定义轮播列表接口",
      dataSourceType: "multiple",
    },
  },
  interaction: {
    events: [],
    logicNodes: [],
  },
};
export default () => {
  const [customCarouselTableProps, setCustomCarouselTableProps] =
    useState(defaultProps);
  return (
    <Stage>
      <AbsoluteContainer
        widget={{
          props: {
            display: Display.NoScale,
            background: { type: "flat", value: "#262626" },
          },
          attr: { w: 300, h: 300 },
        }}
      >
        <CustomCarouselTable
          widget={customCarouselTableProps}
        ></CustomCarouselTable>
      </AbsoluteContainer>
    </Stage>
  );
};
```
