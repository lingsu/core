import { CSSProperties, useMemo } from "react";
import _ from "lodash";
import ReactECharts from "echarts-for-react";
import { LayerOption } from "../../typing";
import Layer from "../Layer";


type EchartsBarAnimationDelayProps = { data: any[], option: any }  &
  LayerOption;

const EchartsBarAnimationDelay = (props: EchartsBarAnimationDelayProps) => {
  // const weightProps = _.merge({}, defaultProps, props);
  // var background = _.last(fills);

  const innerStyle = useMemo(() => {
    const style: CSSProperties = {
      width: "100%",
      height: "100%",
    };

    return style;
  }, [props]);

  const echartsOption = useMemo(() => {

    var series = _.groupBy(props.data, "s");

    return _.merge(
      {},
      props.option,
      {
        xAxis: {
          data: _.map(series, (series) => {
            return series ? series.map((it) => it.x) : null;
          })[0],
        },
        series: _.map(series, (s) => {
          return s
            ? {
                data: s.map((it) => {
                  var data = { ...it, value: it.y };
                  delete data.y;
                  return data;
                }),
              }
            : {
                data: null,
              };
        }),
      }
    );
  }, [props]);

  console.log("echartsOption", echartsOption);
  return (
    <Layer {...props}>
      <div style={innerStyle}>
        <ReactECharts
          option={echartsOption}
          opts={{
            renderer: (echartsOption.renderer as any) || "canvas",
            // width: props.w,
            // height: props.h,
          }}
          style={{
            width: props.w,
            height: props.h,
          }}
        />
      </div>
    </Layer>
  );
};
EchartsBarAnimationDelay.displayName = "Echarts 柱状图";
// EchartsBarAnimationDelay.defaultProps = defaultProps;
export default EchartsBarAnimationDelay;
