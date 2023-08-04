import React, { forwardRef, useRef, useEffect, useCallback } from "react";
import { css } from "@emotion/css";
import _ from "lodash";

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
  ]
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

export enum Display {
  NoScale,
  ScaleByWidth,
  ScaleByHeight,
  FullScale,
  ScaleByHeightWithScroll,
  ScaleToCenter,
  ResizeByPixel,
}

type AbsoluteContainerProps = {
  children?: React.ReactNode;
  width: number;
  height: number;
  display? : Display;
};
const AbsoluteContainer = forwardRef(
  ({ children, width, height, display = Display.ScaleByWidth }: AbsoluteContainerProps, __) => {
    var absolutePagWp = useRef<HTMLDivElement>(null);
    var absolutePage = useRef<HTMLDivElement>(null);

    const setWH = useCallback(() => {
      const absolutePagWpNode = absolutePagWp.current as HtmlNode;
      const absolutePageNode = absolutePage.current as HtmlNode;

      const act: any = {
        [Display.ScaleByWidth]: resizeWidth,
        [Display.NoScale]: noScale,
      }
      var config = {
        width: width,
        height: height,
        // display: display,
        // background: background,
      };

      const result = act[display](absolutePagWpNode, config);
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

    return (
      <div
        ref={absolutePagWp}
        className={css`
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          ::-webkit-scrollbar {height: 3px;  width: 3px;}
          ::-webkit-scrollbar-track {background: transparent;}
          ::-webkit-scrollbar-thumb {border-radius: 2px;background: gray;}
        `}
      >
        <div
          ref={absolutePage}
          className={css`
            // background: rgb(0, 0, 0);
            transform-origin: left top;
          `}
          style={{
            width: width,
            height: height,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default AbsoluteContainer;
