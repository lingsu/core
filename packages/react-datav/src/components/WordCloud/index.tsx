import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { LayerOption, TextStyle } from "../../typing";
import _ from "lodash";
import Layer from "../Layer";
import wordcloud from "wordcloud";

type WordCloudProps = {
  data?: { name: string; value: number }[];
  /** font to use. */
  fontFamily?: string | undefined;
  /** font weight to use, e.g. normal, bold or 600 */
  fontWeight?: string | number | undefined;
  /**
   * color of the text, can be any CSS color, or a callback(word, weight, fontSize, distance, theta)
   * specifies  different color for each item in the list. You may also specify colors with built-in
   * keywords: random-dark and random-light.
   */
  color?:
    | string
    | ((
        word: string,
        weight: string | number,
        fontSize: number,
        distance: number,
        theta: number
      ) => string)
    | undefined;
  /**
   * for DOM clouds, allows the user to define the class of the span elements.Can be a normal class
   * string, applying the same class to every span or a callback(word, weight, fontSize, distance, theta)
   * for per-span class definition. In canvas clouds or if equals null, this option has no effect.
   */
  classes?:
    | string
    | ((
        word: string,
        weight: string | number,
        fontSize: number,
        distance: number,
        theta: number
      ) => string)
    | undefined;
  /** minimum font size to draw on the canvas. */
  minSize?: number | undefined;
  /** function to call or number to multiply for size of each word in the list. */
  weightFactor?: number | ((weight: number) => number) | undefined;
  /** paint the entire canvas with background color and consider it empty before start. */
  clearCanvas?: boolean | undefined;
  /** color of the background. */
  backgroundColor?: string | undefined;

  /**
   * size of the grid in pixels for marking the availability of the canvas — the larger the grid size,
   * the  bigger the gap between words.
   */
  gridSize?: number | undefined;
  /** origin of the “cloud” in [x, y]. */
  origin?: [number, number] | undefined;
  /** set to true to allow word being draw partly outside of the canvas. Allow word bigger than the size of the canvas to be drawn. */
  drawOutOfBound?: boolean | undefined;
  /** set to `true` to shrink the word so it will fit into canvas. Best if `drawOutOfBound` is set to false. This word will now have lower weight. */
  shrinkToFit?: boolean | undefined;

  /** visualize the grid by draw squares to mask the drawn areas. */
  drawMask?: boolean | undefined;
  /** color of the mask squares. */
  maskColor?: string | undefined;
  /** width of the gaps between mask squares. */
  maskGapWidth?: number | undefined;

  /** Wait for x milliseconds before start drawn the next item using setTimeout. */
  wait?: number | undefined;
  /** If the call with in the loop takes more than x milliseconds (and blocks the browser), abort immediately. */
  abortThreshold?: number | undefined;
  /** callback function to call when abort. */
  abort?: Function | undefined;

  /** If the word should rotate, the minimum rotation (in rad) the text should rotate. */
  minRotation?: number | undefined;
  /**
   * If the word should rotate, the maximum rotation (in rad) the text should rotate. Set the two value equal
   * to  keep all text in one angle.
   */
  maxRotation?: number | undefined;
  /** Force the use of a defined number of angles. Set the value equal to 2 in a -90°/90° range means just -90, 0 or 90 will be used. */
  rotationSteps?: number | undefined;

  /** Shuffle the points to draw so the result will be different each time for the same list and settings. */
  shuffle?: boolean | undefined;
  /** Probability for the word to rotate. Set the number to 1 to always rotate. */
  rotateRatio?: number | undefined;

  /**
   * The shape of the "cloud" to draw. Can be any polar equation represented as a callback function, or a
   * keyword present. Available presents are circle (default), cardioid (apple or heart shape curve, the most
   * known polar equation), diamond (alias of square), triangle-forward, triangle, (alias of triangle-upright,
   * pentagon, and star.
   */
  shape?: string | ((theta: number) => number) | undefined;
  /** degree of "flatness" of the shape wordcloud2.js should draw. */
  ellipticity?: number | undefined;

  /**
   * callback to call when the cursor enters or leaves a region occupied by a word. The callback will take
   * arugments callback(item, dimension, event), where event is the original mousemove event. This only will work
   * on HTML5 canvas word clouds.
   */
  hover?: (item: any) => void | undefined;
  /**
   * callback to call when the user clicks on a word. The callback will take arugments
   * callback(item, dimension,  event), where event is the original click event. This only will work on HTML5
   * canvas word clouds.
   */
  click?: (item: any) => void | undefined;
} & LayerOption;

const defaultProps = {
  fontFamily: "Microsoft Yahei",
  fontWeight: "normal",
  // rotationRange: [0, 90],
  fontSizeRangeEnd: 34,
  fontSizeRangeStart: 10,
  backgroundColor: "transparent",
  rotateRatio: 0,
  gridSize: 4,
  shape: "diamond",
  color: "random-light",
};

const WordCloud = (props: WordCloudProps) => {
  const weightProps = _.merge({}, defaultProps, props);
  const canvasRef = useRef<HTMLCanvasElement | HTMLDivElement>(null);

  const style = useMemo(() => {
    var style: CSSProperties = {
      // alignItems: "center",
      // justifyContent: "center",
      // display: "flex",
      width: "100%",
      height: "100%",
    };

    return style;
  }, [props]);

  useEffect(() => {
    if (weightProps.data && weightProps.data.length > 0) {
      var max = _.max( weightProps.data.map((it) => it.value)) as number;
      var min = _.min( weightProps.data.map((it) => it.value)) as number;
      let difValue = max - min;

      let difFontSize =
        weightProps.fontSizeRangeEnd - weightProps.fontSizeRangeStart;
      var list =  weightProps.data.map((it) => [
        it.name,
        weightProps.fontSizeRangeStart +
          Math.floor(difFontSize * ((it.value - min) / difValue)),
      ]);

      // console.log("list", list);
      wordcloud(canvasRef.current!, {
        list: list as any,
        ..._.pick(weightProps, [
          "fontFamily",
          "fontWeight",
          "backgroundColor",
          "rotateRatio",
          "shape",
          "gridSize",
          "color",
          "classes",
          "minSize",
          "origin",
          "click",
          "hover",
        ]),
      });

      return () => {
        wordcloud.stop();
      };
    }
  }, [props]);

  return (
    <Layer {...props}>
      <div style={style} ref={canvasRef}>
      </div>
    </Layer>
  );
};

WordCloud.displayName = "词云";
WordCloud.defaultProps = defaultProps;
export default WordCloud;
