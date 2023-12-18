import { CSSProperties, useMemo } from "react";
import _ from "lodash";
import ReactECharts from "echarts-for-react";
import { LayerOption } from "../../typing";
import Layer from "../Layer";

type EchartsLineCategoryProps = { data: any[]; option: any } & LayerOption;

const EchartsLineCategory = (props: EchartsLineCategoryProps) => {
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

    let option = _.merge({}, props.option, {
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
              // symbol: "",
              // symbolSize: [],
            }
          : {
              data: null,
            };
      }),
    });
    if (option.series.length > 0 && option.series.length === 1) {
      option.series.forEach(function () {
        option.series.push({ data: [{ symbol: "", symbolSize: [] }] });
      });
    }
    return option;
  }, [props]);

  console.log("echartsOption", echartsOption);
  return (
    <Layer {...props}>
      <div style={innerStyle}>
        <ReactECharts
          option={echartsOption}
          opts={{
            renderer: (echartsOption.renderer as any) || "svg",
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
EchartsLineCategory.displayName = "Echarts 象形柱图";
// EchartsLineCategory.defaultProps = defaultProps;
export default EchartsLineCategory;
