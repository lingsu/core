import { CSSProperties } from "react";
import { Display } from "./container/AbsoluteContainer";

export type Size = {
  w: number;
  h: number;
  hUnit?: "px" | "rem";
  wUnit?: "px" | "rem";
};
export type Position = {
  x: number;
  y: number;
  xUnit?: "px" | "rem";
  yUnit?: "px" | "rem";
};
export type Viewport = {
  // x: number;
  // y: number;
  background: string | Background;
  display?: Display;
} & Size;
export type Background = {
  type: string;
  value: string;
};
export type Color = {
  type: string;
  value?: string;
};
export type TextStyle = {
  color?: string | Color;
  fontSize?: number;
  textAlign?: string;
  fontWeight?: string;
  fontFamily?: string;
};
export type UrlConfig = {
  url: string;
  ifBlank: boolean;
};
export type BgBorder = {
  color: string;
  curve: string;
  style: string;
  width: number;
};
export type BackgroundStyle = {
  show: boolean;
  bgColor: string;
  bgBorder: BgBorder;
  borderRadius: number;
};
// export type LayerOption = {
//   filter?: string;
//   background?: string | Background;
//   // title?: ITitle;
//   // global?: IGlobal;
//   // counter?: ICounter;
//   // interaction?: IInteraction;
//   content?: string;
//   radius?: number;
//   repeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y" | "round" | "space";
//   ellipsis?: boolean;
//   cursor?: boolean;
//   textAlign?:
//     | "center"
//     | "end"
//     | "justify"
//     | "left"
//     | "match-parent"
//     | "right"
//     | "start";
//   textStyle?: TextStyle;
//   urlConfig?: UrlConfig;
//   writingMode?:
//     | "horizontal-tb"
//     | "sideways-lr"
//     | "sideways-rl"
//     | "vertical-lr"
//     | "vertical-rl";
//   letterSpacing?: number;
//   backgroundStyle?: BackgroundStyle;
//   display?: Display;
//   backgroundColor?: string;
//   backgroundImage?: string;
// };
export type LayerOption = {
  degree?: number;
  opacity?: number;
  flipH?: boolean;
  flipV?: boolean;

  style?: CSSProperties;
} & Position & Size;
