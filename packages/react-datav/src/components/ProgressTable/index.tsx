import {
  CSSProperties,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cx, css } from "@emotion/css";
import anime from "animejs/lib/anime.es.js";
import { LayerOption, TextStyle } from "../../typing";
import getTextStyle from "../../utils/getTextStyle";
import _ from "lodash";
import Layer from "../Layer";
import { AnimeInstance } from "animejs";
import ProgressCircle from "../ProgressCircle";

type ProgressTableProps = {
  format: string;
} & LayerOption;

export type ProgressType = {
  info: Info;
  show: boolean;
  shape: string;
  style: ProgressStyle;
};
export type Info = {
  show: boolean;
  color: string;
  suffix: string;
  fontSize: number;
  precision: number;
  fontFamily: string;
  fontWeight: string;
};
export type ProgressStyle = {
  color: string;
  barSize: string;
  bgColor: string;
  ringSize: number;
  progressColor: string;
  backgroundColor: string;
  progressCircleColor: string;
  progressHeight: number;
  progressRadius: number;
  underlayStrokeWidth: number;
  overlayStrokeWidth: number;
};

const defaultProps = {
  table: {
    header: {
      show: true,
      sortColor: "rgba(134, 175, 255, 0.62)",
      textAlign: "center",
      textStyle: {
        color: "#ffffff",
        fontSize: 14,
        fontFamily: "Microsoft Yahei",
        fontWeight: "bold",
      },
      lineHeight: 12,
      borderStyle: {
        color: "#fff",
        width: 0,
      },
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    idList: {
      show: false,
      width: 100,
      textSet: {
        color: "rgba(255, 255, 255, 0.8)",
        radius: 50,
        fontSize: 10,
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
        backgroundColor: "#0a73ff",
        backgroundWidth: 20,
        backgroundHeight: 20,
      },
      titleName: "序号",
      specialCol: {
        num: 3,
        show: false,
        imageSet: {
          imgWidth: 20,
          imgHeight: 20,
          imgRadius: 50,
        },
        specMode: "img",
        imgSeries: {
          img: [
            {
              imgSrc:
                "//img.alicdn.com/tfs/TB1ys5uAQL0gK0jSZFtXXXQCXXa-128-128.svg",
            },
            {
              imgSrc:
                "//img.alicdn.com/tfs/TB14nKqAGL7gK0jSZFBXXXZZpXa-128-128.svg",
            },
            {
              imgSrc:
                "//img.alicdn.com/tfs/TB1sz1xAQL0gK0jSZFxXXXWHVXa-128-128.svg",
            },
          ],
          show: false,
        },
        columnName: "imgSrc",
        defaultImg:
          "//img.alicdn.com/tfs/TB1J3GkgeH2gK0jSZJnXXaT1FXa-600-360.png",
        specTextStyle: {
          bgColor: "#f00",
          textColor: "#fff",
        },
      },
    },
    padding: {
      top: 12,
      left: 16,
      right: 16,
      bottom: 12,
    },
    carousel: {
      isCarousel: true,
      // carouselMode: "screen",
      carouselMode: "row",
      timeCarousel: 35000,
    },
    pageSize: 4,
    highLight: {
      show: false,
      setHighLight: {
        bgColor: "#0a73ff",
        boxShaDow: 4,
        boxShaDowX: 1,
        boxShaDowY: 4,
        borderRadius: 0,
        boxShaDowColor: "rgba(89, 89, 89, 0.2)",
      },
      setHighLightText: {
        color: "#fff",
        fontSize: 10,
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
    },
    textStyle: {
      color: "#ffffff",
      fontSize: 15,
      fontFamily: "AlibabaPuHuiTi",
      fontWeight: "normal",
    },
    emptyStyle: {
      emptyText: "暂无数据",
      emptyBackgroundColor: "#0050b3",
    },
    rowKey: "id",
    borderStyle: {
      color: "rgba(10, 115, 255, 0)",
      width: 0,
    },
    basicSetting: {
      isZebra: true,
      textAlign: "center",
      lineHeight: 19,
      backgroundColor: "rgba(0, 80, 179, 0)",
    },
    overflowText: {
      isSpeed: false,
      isScroll: true,
      speedRate: 0.01,
      scrollTime: 1000,
    },
    zebraBackground: "rgba(255, 255, 255, 0.1)",
  },
};

export type ColumnsType<T = any> = {
  title: string;
  dataIndex: string;
  valueType?: "progress";
  render?: (value: any, record: T, index: number) => React.ReactNode;
  progress?: ProgressType;
  width?: number;
};
const columns: ColumnsType[] = [
  {
    title: "city",
    dataIndex: "city",
  },
  {
    title: "sales",
    dataIndex: "sales",
  },
  {
    title: "proportion",
    dataIndex: "proportion",
    valueType: "progress",
    progress: {
      info: {
        show: true,
        color: "#fff",
        suffix: "%",
        fontSize: 12,
        precision: 1,
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
      },
      show: true,
      // shape: "bar",
      shape: "ring",
      style: {
        color: "#00b3ff",
        barSize: "medium",
        bgColor: "rgba(255, 255, 255, 0.1)",
        ringSize: 50,
        progressHeight: 8,
        progressRadius: 20,
        underlayStrokeWidth: 8,
        overlayStrokeWidth: 8,
        progressColor:
          "linear-gradient(90deg, #1fa1ff 0%,#f5793e 99%,rgb(255, 255, 255) 35%)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        progressCircleColor: "#00b3ff",
      },
    },
  },
];

const DefaultNode = memo(
  ({ column, data }: { column: ColumnsType; data: any }) => {
    return <span style={{ display: "inline-block" }}>{data}</span>;
  }
);
const ProgressNode = memo(
  ({ column, data }: { column: ColumnsType; data: any }) => {
    var percent = parseFloat(data);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {column.progress!.shape === "bar" ? (
          <div style={{ flex: 1 }}>
            <div
              style={{
                backgroundColor: column.progress!.style.backgroundColor,
                width: "100%",
                height: column.progress!.style.progressHeight,
                borderRadius: column.progress!.style.progressRadius,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: percent + "%",
                  background: column.progress!.style.progressColor,
                  height: column.progress!.style.progressHeight,
                  borderRadius: column.progress!.style.progressRadius,
                }}
              ></div>
            </div>

            {column.progress!.info.show && (
              <div
                style={{
                  color: column.progress!.info.color,
                  fontSize: column.progress!.info.fontSize,
                  fontWeight: column.progress!.info.fontWeight,
                  fontFamily: column.progress!.info.fontFamily,
                  marginLeft: 10,
                }}
              >
                {percent.toFixed(column.progress!.info.precision)}
                {column.progress!.info.suffix}
              </div>
            )}
          </div>
        ) : (
          <div>
            <ProgressCircle
              size={column.progress!.style.ringSize}
              percent={percent}
              underlayStrokeWidth={column.progress!.style.underlayStrokeWidth}
              overlayStrokeWidth={column.progress!.style.overlayStrokeWidth}
              backgroundColor={column.progress!.style.backgroundColor}
              color={column.progress!.style.progressCircleColor}
            />
          </div>
        )}
      </div>
    );
  }
);
const ProgressTable = (props: ProgressTableProps) => {
  const weightProps = _.merge({}, defaultProps, props);
  const [data, setData] = useState<any[]>([
    {
      id: 1,
      value:
        "https://img.alicdn.com/imgextra/i3/O1CN01WlrRFN1NsIPslloOW_!!6000000001625-2-tps-180-108.png",
      sales: 23,
      proportion: 20,
      city: "北京",
      link: "//www.aliyun.com/",
    },
    {
      id: 2,
      value:
        "https://img.alicdn.com/imgextra/i2/O1CN01Sh9r2s1FAJSLux0h0_!!6000000000446-2-tps-180-108.png",
      sales: -34,
      proportion: 45,
      city: "上海",
    },
    {
      id: 3,
      value:
        "https://img.alicdn.com/imgextra/i3/O1CN01vyRtik1JCq6bvTVwd_!!6000000000993-2-tps-180-108.png",
      sales: 24,
      proportion: 80,
      city: "杭州",
    },
    {
      id: 4,
      value:
        "https://img.alicdn.com/imgextra/i3/O1CN01WlrRFN1NsIPslloOW_!!6000000001625-2-tps-180-108.png",
      sales: 80,
      proportion: 20,
      city: "深圳",
    },
    {
      id: 5,
      value:
        "https://img.alicdn.com/imgextra/i3/O1CN01vyRtik1JCq6bvTVwd_!!6000000000993-2-tps-180-108.png",
      sales: -31,
      proportion: 45,
      city: "合肥",
    },
    {
      id: 6,
      value:
        "https://img.alicdn.com/imgextra/i3/O1CN01WlrRFN1NsIPslloOW_!!6000000001625-2-tps-180-108.png",
      sales: 55,
      proportion: 80,
      city: "成都",
    },
  ]);
  const divRef = useRef<HTMLDivElement>(null);

  const typeWrapped = useMemo(() => {
    return {
      default: DefaultNode,
      progress: ProgressNode,
    };
  }, []);
  const stateRef = useRef<{
    rowsData: any[];
    avgHeight: number;
    animationIndex: number;
    animationTime: AnimeInstance | null;
    isParity: boolean;
  }>({
    // ...state,
    rowsData: [],
    avgHeight: 0,
    animationIndex: 0,
    // animationTime:null as unknown as AnimeInstance,
    animationTime: null,
    isParity: false,
  });

  const style = useMemo(() => {
    var style: CSSProperties = {
      // alignItems: "center",
      // justifyContent: "center",
      // display: "flex",
      width: "100%",
      height: "100%",
      pointerEvents: "all",
      // ...getTextStyle(weightProps.textStyle),
    };

    return style;
  }, [props]);
  // const getRowKey = (item: any, index: number) => {
  //   if (typeof weightProps.table.rowKey === "string") {
  //     return item[weightProps.table.rowKey];
  //   }
  //   return (weightProps.table.rowKey as any)(item, index);
  // };

  const getRowKey = useMemo(() => {
    if (typeof weightProps.table.rowKey === "function") {
      return weightProps.table.rowKey;
    }
    return (item: any, index: number) => {
      return item[weightProps.table.rowKey] ?? index.toString();
    };
  }, [props]);

  useEffect(() => {
    var timer: any = null;
    var clearTime: any = null;

    const clearRemoteTime = () => {
      let trs = divRef.current
        ?.getElementsByClassName("datav-progress-table-body")[0]
        .getElementsByTagName("tr") as HTMLCollection;
      if (stateRef.current!.animationTime) {
        stateRef.current!.animationTime = null;
      }
      if (timer) {
        clearTimeout(timer);
      }
      anime.remove(trs);
    };

    const animation = (duration: number) => {
      let trs = divRef.current
        ?.getElementsByClassName("datav-progress-table-body")[0]
        .getElementsByTagName("tr") as HTMLCollection;
      var clientHeight = trs[0].clientHeight;
      // console.log("trs", trs[0].getBoundingClientRect());
      // console.log("trs", trs[0].clientHeight);
      stateRef.current!.animationTime = anime({
        targets: trs,
        translateY:
          weightProps.table.carousel.carouselMode == "screen"
            ? -(clientHeight * weightProps.table.pageSize)
            : -clientHeight,
        easing: "linear",
        duration: duration,
        complete: function () {
          // n.css({ transform: "translateY(0)" }), e.handleScroll();
          // console.log("fffff");
          stateRef.current.isParity = !stateRef.current.isParity;

          setData((pre) => {
            var newData = [...pre];
            if (weightProps.table.carousel.carouselMode === "screen") {
              var pageSize = weightProps.table.pageSize;
              var len = newData.length % pageSize;
              if (len > 0) {
                for (let i = 0; i < pageSize - len; i++) {
                  newData.push({
                    id: "scroll" + i,
                  });
                }
              }

              var removes = newData.splice(0, pageSize);
              newData = newData.concat(removes);
            } else {
              newData.push(newData.shift());
            }

            return newData;
          });

          // for (let i = 0; i < trs.length; i++) {
          //   const tr = trs[i] as HTMLTableRowElement;
          //   tr.style.transform = "translateY(0)";
          //   // tr.style.transition = "none";
          // }
        },
      });
      // console.log("animationTime", stateRef.current!);
    };
    const loop = () => {
      clearRemoteTime();
      animation(weightProps.table.overflowText.scrollTime);
      timer = setTimeout(loop, weightProps.table.carousel.timeCarousel);
    };

    clearRemoteTime();
    if (clearTime) {
      clearTimeout(clearTime);
    }
    if (weightProps.table.carousel.isCarousel) {
      clearTime = setTimeout(function () {
        loop();
      }, weightProps.table.carousel.timeCarousel);
    }

    return () => {
      clearRemoteTime();
    };
  }, [props]);

  // console.log("data", data);

  return (
    <Layer {...props}>
      <div
        style={style}
        className={cx(
          css(`
          table {
            width: 100%;
            table-layout: fixed;
            border-spacing: 0;
            border-collapse: separate;
          }

          .next-table-row{
              transition: all .1s linear;
          }
        `),
          "datav-progress-table"
        )}
        ref={divRef}
      >
        {weightProps.table.header.show && (
          <div className="datav-progress-table-header">
            <table>
              <colgroup>
                {columns.map((item, index) => (
                  <col key={index} style={{ width: item.width }}></col>
                ))}
              </colgroup>
              <thead>
                <tr>
                  {columns.map((item, index) => (
                    <th
                      key={index}
                      style={{
                        textAlign: weightProps.table.header.textAlign,
                        ...weightProps.table.header.textStyle,
                        backgroundColor:
                          weightProps.table.header.backgroundColor,
                        border: weightProps.table.header.borderStyle.width,
                        borderColor: weightProps.table.header.borderStyle.color,
                        borderStyle: "solid",
                        lineHeight: weightProps.table.header.lineHeight + "px",
                        paddingLeft: weightProps.table.padding.left,
                        paddingTop: weightProps.table.padding.top,
                        paddingRight: weightProps.table.padding.right,
                        paddingBottom: weightProps.table.padding.bottom,
                      }}
                    >
                      <div>{item.title}</div>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        )}

        <div
          className="datav-progress-table-body"
          style={{
            height:
              (weightProps.table.basicSetting.lineHeight +
                weightProps.table.padding.top +
                weightProps.table.padding.bottom +
                2 * weightProps.table.borderStyle.width) *
              weightProps.table.pageSize,
            overflow: "hidden",
          }}
        >
          <table
            style={{
              borderCollapse: "separate",
            }}
          >
            <colgroup>
              {columns.map((item, index) => (
                <col key={index} style={{ width: item.width }}></col>
              ))}
            </colgroup>
            <tbody>
              {data.map((item: any, index: number) => {
                const key = getRowKey(item, index);
                const isZebra =
                  weightProps.table.basicSetting.isZebra &&
                  index % 2 == (stateRef.current.isParity ? 0 : 1);
                return (
                  <tr
                    // key={item.id}
                    key={`${index}${key}`}
                    style={{
                      transform: "translateY(0)",
                      transition: "none",
                    }}
                    className={cx("next-table-row", {
                      first: index === 0,
                      last: index === data.length - 1,
                    })}
                  >
                    {columns.map((column, cindex) => {
                      let edgeType = column.valueType || "default";
                      const CellComponent =
                        typeWrapped[edgeType] || typeWrapped.default;

                      const RenderComponent = column.render
                        ? column.render(CellComponent, item, cindex)
                        : CellComponent;

                      return (
                        <td
                          key={cindex}
                          style={{
                            ...weightProps.table.textStyle,
                            textAlign: weightProps.table.basicSetting.textAlign,
                            // fontSize: weightProps.table.textStyle.fontSize,
                            lineHeight:
                              weightProps.table.basicSetting.lineHeight + "px",
                            border: weightProps.table.borderStyle.width,
                            borderColor: weightProps.table.borderStyle.color,
                            backgroundColor: isZebra
                              ? weightProps.table.zebraBackground
                              : weightProps.table.basicSetting.backgroundColor,
                          }}
                        >
                          <div
                            style={{
                              // padding: "12px 16px",
                              paddingLeft: weightProps.table.padding.left,
                              paddingTop: weightProps.table.padding.top,
                              paddingRight: weightProps.table.padding.right,
                              paddingBottom: weightProps.table.padding.bottom,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              wordBreak: "break-all",
                              ...weightProps.table.textStyle,
                            }}
                          >
                            <RenderComponent
                              key={key}
                              data={item[column.dataIndex]}
                              column={column}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layer>
  );
};

ProgressTable.displayName = "进度条表格";
ProgressTable.defaultProps = defaultProps;
export default ProgressTable;
