import { CSSProperties, useEffect, useMemo, useState } from "react";
import { LayerOption, TextStyle } from "../../typing";
import getTextStyle from "../../utils/getTextStyle";
import _ from "lodash";
import Layer from "../Layer";

type TimeProps = {
  format: string;
  textStyle?: TextStyle;
} & LayerOption;

const defaultProps = {
  format: "yyyy-MM-dd HH:mm:ss",
  textStyle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Microsoft Yahei",
    fontWeight: "normal",
  },
};

const pattern = (date: Date, format: string) => {
  var values = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": 0 == date.getHours() % 12 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(),
  };
  const week = {
    0: "\u65e5",
    1: "\u4e00",
    2: "\u4e8c",
    3: "\u4e09",
    4: "\u56db",
    5: "\u4e94",
    6: "\u516d",
  };

  let re = /(y+)/;
  if (re.test(format)) {
    let value = re.exec(format)![1];
    format = format.replace(
      value,
      (date.getFullYear() + "").substring(4 - value.length)
    );
  }

  re = /(E+)/;
  if (re.test(format)) {
    let value = re.exec(format)![1];
    format = format.replace(
      value,
      (value.length > 1 ? (value.length > 2 ? "\u661f\u671f" : "\u5468") : "") +
        week[date.getDay() + ""]
    );
  }

  for (const reg in values) {
    re = new RegExp("(" + reg + ")");
    if (re.test(format)) {
      let value = re.exec(format)![1];
      format = format.replace(
        re,
        value.length === 1
          ? values[reg]
          : ("00" + values[reg]).substring(("" + values[reg]).length)
      );
    }
  }

  return format;
};
const Time = (props: TimeProps) => {
  const weightProps = _.merge({}, defaultProps, props);
  const [time, setTime] = useState<string>("");

  const style = useMemo(() => {
    var style: CSSProperties = {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      ...getTextStyle(weightProps.textStyle),
    };

    return style;
  }, [props]);

  useEffect(() => {
    var timer: any = null;

    const animation = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setTime(pattern(new Date(), weightProps.format));

      // let secondsLeft =
      //   parserDate(weightProps.endTime!).getTime() / 1000 -
      //   new Date().getTime() / 1000;
      // if (secondsLeft > 0) {
      timer = setTimeout(() => {
        animation();
      }, 1000);
      // }
    };
    animation();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [props]);

  return (
    <Layer {...props}>
      <div style={style}>{time}</div>
    </Layer>
  );
};

Time.displayName = "时间器";
Time.defaultProps = defaultProps;
export default Time;
