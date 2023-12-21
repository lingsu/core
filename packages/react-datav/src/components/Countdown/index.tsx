import { CSSProperties, useEffect, useMemo, useState } from "react";
import { LayerOption, TextStyle } from "../../typing";
import getTextStyle from "../../utils/getTextStyle";
import _ from "lodash";
import Layer from "../Layer";

type CountdownProps = {
  textStyle?: TextStyle;
  lineHeight?: number;
  textIndent?: number;
  letterSpacing?: number;
  endTime?: string;
} & LayerOption;

const defaultProps = {
  endTime: "2023-11-11 00:00:00",
  textStyle: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Microsoft Yahei",
    fontWeight: "normal",
  },
};

const parserDate = (t: string) => {
  var e = Date.parse(t);
  return isNaN(e) ? new Date() : new Date(Date.parse(t.replace(/-/g, "/")));
};
const Countdown = (props: CountdownProps) => {
  const weightProps = _.merge({}, defaultProps, props);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const style = useMemo(() => {
    var style: CSSProperties = {
      ...getTextStyle(weightProps.textStyle),
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    };

    return style;
  }, [props]);

  useEffect(() => {
    if (weightProps.endTime) {
      var timer: any = null;

      const animation = () => {
        if (timer) {
          clearTimeout(timer);
        }

        let secondsLeft =
          parserDate(weightProps.endTime).getTime() / 1000 -
          new Date().getTime() / 1000;
        if (secondsLeft > 0) {
          timer = setTimeout(() => {
            animation();
          }, 1000);
          setSecondsLeft(secondsLeft);
        }
      };
      animation();

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [props]);

  var now = new Date().getTime() / 1000;
  var end =
    secondsLeft > 0 ? parserDate(weightProps.endTime).getTime() / 1000 : now;
  let dif = end - now;
  let day = Math.floor(dif / 86400);
  let hour = Math.floor((dif % 86400) / 3600);
  let minute = Math.floor(((dif % 86400) % 3600) / 60);
  let second = Math.floor((((dif % 86400) % 3600) % 60) % 60);
  return (
    <Layer {...props}>
      <div style={style}>
        <span className="datav-day">{day}</span>
        <span className="datav-dayUnit" style={{margin:'0 10px'}}>天</span>
        <span className="datav-time">
          {hour.toString().padStart(2, "0")}:
          {minute.toString().padStart(2, "0")}:
          {second.toString().padStart(2, "0")}
        </span>
      </div>
    </Layer>
  );
};

Countdown.displayName = "倒计时";
Countdown.defaultProps = defaultProps;
export default Countdown;
