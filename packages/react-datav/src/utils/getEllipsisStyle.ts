import { CSSProperties } from "react";

const getEllipsisStyle = (ellipsis?: boolean) => {
  if (ellipsis) {
    return {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    } as CSSProperties;
  }

  return {};
};
export default getEllipsisStyle;
