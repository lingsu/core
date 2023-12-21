import { CSSProperties, useEffect, useMemo, useState } from "react";
import { LayerOption, TextStyle } from "../../typing";
import getTextStyle from "../../utils/getTextStyle";
import _ from "lodash";
import Layer from "../Layer";

export type Time = {
  padding: number;
  textStyle?: TextStyle;
};

export type DayUnit = {
  textStyle?: TextStyle;
  marginLeft?: number;
  marginRight?: number;
};
export type DayNumbers = {
  textStyle?: TextStyle;
};

type CountdownProps = {
  endTime?: string;
  time?: Time;
  dayUnit?: DayUnit;
  dayNumbers?: DayNumbers;
} & LayerOption;

const defaultProps = {
  time: {
    padding: 0,
    textStyle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontFamily: "Microsoft Yahei",
      fontWeight: "normal",
    },
  },
  dayUnit: {
    textStyle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontFamily: "Microsoft Yahei",
      fontWeight: "normal",
    },
    marginLeft: 12.5,
    marginRight: 12.5,
  },
  dayNumbers: {
    textStyle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontFamily: "Microsoft Yahei",
      fontWeight: "normal",
    },
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
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    };

    return style;
  }, [props]);
  const dayNumbersStyle = useMemo(() => {
    var style: CSSProperties = {
      marginLeft: weightProps.dayUnit.marginLeft,
      marginRight: weightProps.dayUnit.marginRight,
      ...getTextStyle(weightProps.dayUnit.textStyle),
    };

    return style;
  }, [props]);
  const dayUnitStyle = useMemo(() => {
    var style: CSSProperties = {
      marginLeft: weightProps.dayUnit.marginLeft,
      marginRight: weightProps.dayUnit.marginRight,
      ...getTextStyle(weightProps.dayUnit.textStyle),
    };

    return style;
  }, [props]);
  const timeStyle = useMemo(() => {
    var style: CSSProperties = {
      padding: weightProps.time.padding,
      ...getTextStyle(weightProps.time.textStyle),
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
          parserDate(weightProps.endTime!).getTime() / 1000 -
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
    secondsLeft > 0 ? parserDate(weightProps.endTime!).getTime() / 1000 : now;
  let dif = end - now;
  let day = Math.floor(dif / 86400);
  let hour = Math.floor((dif % 86400) / 3600);
  let minute = Math.floor(((dif % 86400) % 3600) / 60);
  let second = Math.floor((((dif % 86400) % 3600) % 60) % 60);
  return (
    <Layer {...props}>
      <div style={style}>
        <span className="datav-day" style={dayNumbersStyle}>{day}</span>
        <span className="datav-dayUnit" style={dayUnitStyle}>
          天
        </span>
        <span className="datav-time" style={timeStyle}>
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
