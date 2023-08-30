import React from "react";

export default (props: { children?: React.ReactElement }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div>{props.children || <span>加载中...</span>}</div>
    </div>
  );
};
