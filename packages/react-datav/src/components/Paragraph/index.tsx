import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { LayerOption, TextStyle } from "../../typing";
import getTextStyle from "../../utils/getTextStyle";
import _ from "lodash";
import Layer from "../Layer";

export type Scroll = {
  rate: number;
  duration: number;
  overScroll: boolean;
  isUniformSpeed: boolean;
};
type ParagraphProps = {
  content: string;
  scroll?: Scroll;
  textAlign?: string;
  textStyle?: TextStyle;
  lineHeight?: number;
  textIndent?: number;
  letterSpacing?: number;
} & LayerOption;

const defaultProps = {
  content: "",
  scroll: {
    rate: 0.03,
    duration: 5000,
    overScroll: false,
    isUniformSpeed: false,
  },
  textAlign: "left",
  textStyle: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Microsoft Yahei",
    fontWeight: "normal",
  },
  lineHeight: 36,
  textIndent: 0,
  letterSpacing: 1,
};

const Paragraph = (props: ParagraphProps) => {
  const weightProps = _.merge({}, defaultProps, props);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  // const [conHeight, setConHeight] = useState(0);

  const style = useMemo(() => {
    var style: CSSProperties = {
      ...getTextStyle(weightProps.textStyle),
      letterSpacing: weightProps.letterSpacing
        ? `${weightProps.letterSpacing}px`
        : undefined,
      textAlign: weightProps.textAlign as any,
      lineHeight: weightProps.lineHeight
        ? `${weightProps.lineHeight}px`
        : undefined,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      textIndent: weightProps.textIndent,
      wordBreak: "break-all",
    };
    Object.entries(style).forEach(([key, value]) => {
      style[key] = value;
    });
    // wrapper.container.current.style
    return style;
  }, [props]);

  useEffect(() => {
    // console.log("wrapRef", wrapRef.current?.getBoundingClientRect());
    // console.log("contentRef", contentRef.current?.getBoundingClientRect());

    if (
      weightProps.scroll.overScroll &&
      wrapRef.current &&
      contentRef.current &&
      contentRef.current.getBoundingClientRect().height > weightProps.h
    ) {
      // setConHeight(contentRef.current?.getBoundingClientRect().height);
      setCount(1);
      var timer: any = null;

      const animation = () => {
        if (timer) {
          clearTimeout(timer);
        }
        wrapRef.current!.style.transform = `translateY(-${
          contentRef.current!.getBoundingClientRect().height
        }px)`;
        wrapRef.current!.style.transition = `transform ${
          weightProps.scroll.duration / 1000
        }s linear`;

        timer = setTimeout(() => {
          wrapRef.current!.style.transform = "translateY(0)";
          wrapRef.current!.style.transition = "transform 0s linear";
          animation();
        }, weightProps.scroll.duration);
      };

      animation();

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    } else {
      setCount(0);
    }
  }, [props]);

  return (
    <Layer {...props}>
      <div style={style}>
        <div ref={wrapRef}>
          <div ref={contentRef}>{weightProps.content}</div>
          {count > 0 && <div>{weightProps.content}</div>}
        </div>
      </div>
    </Layer>
  );
};

Paragraph.displayName = "多行文本";
Paragraph.defaultProps = defaultProps;
export default Paragraph;
