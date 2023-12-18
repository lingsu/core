import { CSSProperties, useMemo } from "react";
import _ from "lodash";
import { LayerOption } from "../../typing";
import Layer from "../Layer";
import ReactFastMarquee from "react-fast-marquee";

const defaultProps = {
  loop: true,
  speed: 50,
  ifSpeed: false,
  delay: 2,
  textStyle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Microsoft Yahei",
    fontWeight: "normal",
    // textShadow: [],
  },
  subordinate: 0,
  direction:'left'
};
type MarqueeProps = typeof defaultProps & {content?: string} & LayerOption;

const Marquee = (props: MarqueeProps) => {
  const weightProps = _.merge({}, defaultProps, props);
  // var background = _.last(fills);

  const innerStyle = useMemo(() => {
    const style = {
      width: "100%",
      height: "100%",
      ...weightProps.textStyle
    };

    return style as CSSProperties;
  }, [props]);

  return (
    <Layer {...props}>
      <ReactFastMarquee  speed={weightProps.speed} delay={weightProps.delay} direction={weightProps.direction} loop={weightProps.loop ? 0: 1} >
        <div style={innerStyle}>{weightProps.content}</div>
      </ReactFastMarquee>
    </Layer>
  );
};
Marquee.displayName = "跑马灯";
Marquee.defaultProps = defaultProps;
export default Marquee;
