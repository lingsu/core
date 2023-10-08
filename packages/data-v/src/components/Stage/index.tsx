import React, { forwardRef, useRef, useEffect, useCallback } from "react";
import { CommonWidgetProps } from "../../typing";
import toArray from "rc-util/lib/Children/toArray";
import DataLayer from "../DataLayer";

type StageProps = {} & CommonWidgetProps;

export default ({ children }: Partial<StageProps>) => {
  const childNodes = toArray(children, { keepEmpty: true });
  var nodes = childNodes.map((child, i) => {
    var key = (child && child.key) || `item-${i}`;
    // console.log("child", child);
    return (
      <DataLayer key={key} widget={child.props.widget}>
        {child}
      </DataLayer>
    );
  });

  return (
    <div
      className="datav-stage"
      style={{
        width: '100%',
        height:'100%'
      }}
    >
      {nodes}
    </div>
  );
};
