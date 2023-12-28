import { Background, Color } from "../typing";

export default (background: string | Background | Color) => {
  if (!background) {
    return "rgba(255,255,255,0)";
  }
  if (typeof background === "string") {
    return background;
  }
  if (background.type === "flat") {
    return background.value;
  }

  console.warn("未知类型", background);
  return undefined;
};
