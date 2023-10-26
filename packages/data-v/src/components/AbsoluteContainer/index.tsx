import React, { forwardRef, useRef, useEffect, useCallback, memo } from "react";
import { css } from "@emotion/css";
import _ from "lodash";
import toArray from "rc-util/lib/Children/toArray";
import DataLayer from "../DataLayer";
import { CommonWidgetProps, DatavConfig, Display, IProps } from "../../typing";

type HtmlNode = HTMLElement & {
  innerWidth?: number;
  innerHeight?: number;
};
type Config = {
  width: number;
  height: number;
  display?: boolean;
  background?: string;
};

function setElementStyle(node: HtmlNode, style: any) {
  if (node && style) {
    Object.entries(style).forEach(function (key: any) {
      node.style[key[0]] = key[1];
    });
  }
}

// function scaleX(node: HtmlNode, node2?: HtmlNode) {
//   var scaleX = getInnerWidth(node) / getBoundingClientRectWidth(document.body);
//   var scaleY =
//     getInnerHeight(node) / getBoundingClientRectHeight(document.body);
//   var minScale = Math.min(scaleX, scaleY);
//   return [
//     {
//       transform: `scale(${minScale})`,
//       transformOrigin: "left top",
//       marginLeft:
//         (getBoundingClientRectWidth(document.documentElement) -
//           getBoundingClientRectWidth(document.body) * minScale) /
//         2,
//     },
//     {},
//   ];
// }
// function scaleXY(node?: Config) {
//   var scaleX =
//     getBoundingClientRectWidth(document.documentElement) /
//     getBoundingClientRectWidth(document.body);
//   var scaleY =
//     getBoundingClientRectWidth(document.documentElement) /
//     getBoundingClientRectHeight(document.body);
//   return [
//     {
//       transform: `scale(${scaleX}, ${scaleY})`,
//       transformOrigin: "left top",
//     },
//     {},
//   ];
// }
// const getBoundingClientRectWidth = (node: HTMLElement) =>
//   node.getBoundingClientRect().width;
// const getBoundingClientRectHeight = (node: HTMLElement) =>
//   node.getBoundingClientRect().height;

function getInnerWidth(node: HtmlNode): number {
  return node.innerWidth || node.offsetWidth;
}
// const getInnerHeight = (node: HtmlNode) =>
//   node.innerHeight || node.offsetHeight;

var noScale = function (_: HtmlNode, node2: Config) {
  return [
    {
      width: `${node2.width}px`,
      height: `${node2.height}px`,
    },
    {},
  ];
};

var resizeWidth = function (node: HtmlNode, node2: Config) {
  var width = node2.width,
    scaleX: number = getInnerWidth(node) / (width || getInnerWidth(node));

  // console.log("resizeWidth", scaleX);

  return [
    {
      overflowX: "hidden",
      overflowY: "hidden",
      height: node2.height * scaleX + "px",
    },
    {
      transform: `scale(${scaleX})`,
      transformOrigin: "left top",
    },
  ];
};

// function resizeFull(node: HtmlNode, node2: Config) {
//   var n = !!node2.background,
//     height = node2.height,
//     width = node2.width;
//   if (!height || !width) return scaleXY(node2);
//   var scaleX = getInnerWidth(node) / width,
//     scaleY = getInnerHeight(node) / height;
//   return [
//     n ? {} : { backgroundSize: "100% 100%" },
//     {
//       transform: `scale(${scaleX}, ${scaleY})`,
//       transformOrigin: "left top",
//     },
//   ];
// }

type AbsoluteContainerProps = {
} & CommonWidgetProps;
const AbsoluteContainer = forwardRef(
  (
    {
      children,
      widget,
 
    }: AbsoluteContainerProps,
    __
  ) => {

    const { 
      props,
      // display = Display.ScaleByWidth,
      attr,
      common,
     } = widget;
    const { display = Display.ScaleByWidth, background } = props;
    const {
      x,
      y,
      h,
      w,
      hUnit = "px",
      wUnit = "px",
      xUnit = "px",
      yUnit = "px",
      // hide = false,
      // degree = 0,
    } = { ...attr };

    const { hide = false, degree = 0, opacity = 1 } = { ...common };
    const { type, value } =
      (typeof background == "string"
        ? { type: "flat", value: background }
        : background) || {};

    var absolutePagWp = useRef<HTMLDivElement>(null);
    var absolutePage = useRef<HTMLDivElement>(null);

    const setWH = useCallback(() => {
      const absolutePagWpNode = absolutePagWp.current as HtmlNode;
      const absolutePageNode = absolutePage.current as HtmlNode;

      const act: any = {
        [Display.ScaleByWidth]: resizeWidth,
        [Display.NoScale]: noScale,
      };
      var config = {
        width: w,
        height: h,
        // display: display,
        // background: background,
      };
      // console.log('absolutePagWpNode',absolutePagWpNode, getInnerWidth(absolutePagWpNode))
      // console.log('absolutePageNode',absolutePageNode)
      const result = act[display](absolutePagWpNode, config);
      // console.log('result',display, result)

      setElementStyle(absolutePagWpNode, result[0]);
      setElementStyle(absolutePageNode, result[1]);
    }, []);

    useEffect(() => {
      const debounceSetWHFun = _.debounce(setWH, 100);

      debounceSetWHFun();

      window.addEventListener("resize", debounceSetWHFun);

      return () => {
        window.removeEventListener("resize", debounceSetWHFun);
      };
    }, []);

    const childNodes = toArray(children, { keepEmpty: true });
    var nodes = childNodes.map((child, i) => {
      var key = (child && child.key) || `item-${i}`;
      console.log('child',key, child)
      return (
        <DataLayer
          key={key}
          widget={child.props.widget}
        >
          {child}
        </DataLayer>
      );
    });
    console.log('finish');
    return (
      <div
        ref={absolutePagWp}
        className={css`
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          ::-webkit-scrollbar {
            height: 3px;
            width: 3px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background: gray;
          }
        `}
      >
        <div
          ref={absolutePage}
          className={css`
            // background: rgb(0, 0, 0);
            transform-origin: left top;
          `}
          style={{
            width: w,
            height: h,
            background: value,
          }}
        >
          <div
            style={{
              background: value,
            }}
          >
            {nodes}
          </div>
        </div>
      </div>
    );
  }
);

AbsoluteContainer.displayName = "AbsoluteContainer";

export default memo(AbsoluteContainer);
