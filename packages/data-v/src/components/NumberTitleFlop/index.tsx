import { useContext, useEffect, useMemo, } from "react";
import { CommonWidgetProps, } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import getTextStyle from "../../utils/getTextStyle";
import { css } from "@emotion/css";
import { DatavDataSourceContext } from "../DatavCommonHoc/context";
import _ from "lodash";
import CountUp from "../../CountUp";

// import { renderToString } from 'react-dom/server';

// {"main-img_4bzfk/source":{"type": "static", "isError":false,"data":[{"img":"","url":""}]},
// "main-title_qeqfb/source":{"type": "static", "isError":false,"data":[]},
// "number-title-flop_d0upt/source":{"type": "static", "isError":false,"data":[{"name":"","value":232425}]}}

type NumberTitleFlopType = {
  title: ITitle;
  global: IGlobal;
  counter: ICounter;
  interaction: IInteraction;
};
type ITitle = {
  content: string;
  textStyle?: ITextStyle;
};
type ITextStyle = {
  color: string | IColor;
  fontSize?: number;
  textAlign?: string;
  fontWeight?: string;
  fontFamily?: string;
};
type IGlobal = {
  distance: number;
  textStyle: ITextStyle;
  arrangement: string;
  abnormalData: number;
  initShowData: number;
};
type ICounter = {
  margin: IMargin;
  prefix: IPrefix;
  suffix: ISuffix;
  numbers: INumbers;
  fontFamily: string;
  textShadow: any[];
  justifyContent: string;
};
type IMargin = {
  preNum: number;
  numSuff: number;
};
type IPrefix = {
  content: string;
  textStyle: ITextStyle;
};
type ISuffix = {
  content: string;
  textStyle: ITextStyle;
  suffixArrange: string;
};
type INumbers = {
  digit: number;
  decimal: number;
  duration: number;
  rounding: boolean;
  animation: boolean;
  increment: boolean;
  textStyle: ITextStyle;
  fixedWidth: number;
  marginRight: number;
  sameDataFlip: boolean;
  decimalSymbol: string;
  backgroundColor: IBackgroundColor;
  separatingChart: boolean;
  backgroundRadius: number;
  separatingSymbol: string;
  separatingBackground: boolean;
};
type IColor = {
  type: string;
  value: string;
};
type IBackgroundColor = {
  type: string;
  value: string;
};
type IInteraction = {
  cursor: boolean;
};

const defaultProps = {
  attr: {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    deg: 0,
    hUnit: "px",
    wUnit: "px",
    xUnit: "px",
    yUnit: "px",
  },
  list: [],
  name: "number-title-flop",
  type: "ui",
  props: {
    title: {
      content: "Typesomething",
      textStyle: {
        color: "rgb(121, 218, 255)",
        fontSize: 18,
        textAlign: "flex-start",
        fontWeight: "normal",
      },
    },
    global: {
      distance: 0,
      textStyle: {
        fontFamily: "Microsoft Yahei",
      },
      arrangement: "top",
      abnormalData: 0,
      initShowData: 0,
    },
    counter: {
      margin: {
        preNum: 0,
        numSuff: 0,
      },
      prefix: {
        content: "￥",
        textStyle: {
          color: "rgb(10, 115, 255)",
          fontSize: 36,
          fontFamily: "Microsoft Yahei",
          fontWeight: "bolder",
        },
      },
      suffix: {
        content: "",
        textStyle: {
          color: "#ffffff",
          fontSize: 30,
          fontFamily: "Microsoft Yahei",
          fontWeight: "bolder",
        },
        suffixArrange: "baseline",
      },
      numbers: {
        digit: 0,
        decimal: 2,
        duration: 1000,
        rounding: true,
        animation: true,
        increment: false,
        textStyle: {
          color: {
            type: "flat",
            value: "rgb(10, 115, 255)",
          },
          fontSize: 36,
          fontWeight: "bolder",
        },
        fixedWidth: 0,
        marginRight: 0,
        sameDataFlip: false,
        decimalSymbol: ".",
        backgroundColor: {
          type: "flat",
          value: "rgba(51,51,51,0)",
        },
        separatingChart: true,
        backgroundRadius: 0,
        separatingSymbol: ",",
        separatingBackground: false,
      },
      fontFamily: "Microsoft Yahei",
      textShadow: [],
      justifyContent: "flex-start",
    },
    interaction: {
      cursor: false,
    },
  },
  common: {
    hide: false,
    flipH: false,
    flipV: false,
    degree: 0,
    filter: {
      hue: 0,
      enable: false,
      opacity: 100,
      contrast: 100,
      saturate: 100,
      brightness: 100,
    },
    opacity: 1,
    transform: {
      scale3d: {
        x: 1,
        y: 1,
        z: 1,
        lock: false,
      },
      rotate3d: {
        deg: 30,
        axis: "y",
      },
      translate3d: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  },
  dataConfig: {
    source: {
      name: "数据接口",
      handler: "render",
      dataSource: {
        multiple: {
          $type: "static",
        },
      },
      dataRequire: {
        type: "array",
        items: {
          type: "object",
          required: ["value"],
          properties: {
            name: {
              type: ["string"],
              extension: {
                description: "标题",
              },
            },
            value: {
              type: ["number"],
              extension: {
                description: "数值",
              },
            },
            prefix: {
              type: ["string"],
              extension: {
                description: "前缀",
              },
            },
            suffix: {
              type: ["string"],
              extension: {
                description: "后缀",
              },
            },
          },
        },
        extension: {},
      },
      description: "数据接口",
      dataSourceType: "multiple",
    },
  },
  interaction: {
    events: [],
    logicNodes: [],
  },
};

export class DatavPlugin {
  // ...some properties here
  numbers: INumbers;
  constructor(numbers: INumbers) {
    // ...setup code here if you need it
    this.numbers = numbers;
  }
  render(elem: HTMLElement, formatted: string): void {
    // render DOM here
    // elem.innerHTML =
    var spans: string[] = [];
    for (let i = 0; i < formatted.length; i++) {
      const chat = formatted[i];
      if (
        this.numbers.separatingBackground === false &&
        [this.numbers.separatingSymbol, this.numbers.decimalSymbol].includes(
          chat
        )
      ) {
        spans.push(
          `<span style="display:inline-block;text-indent:0.02em;height:auto;line-height:normal;margin-right:${this.numbers.marginRight}em;border-radius:0px;line-height: 1;">${chat}</span>`
        );
      } else {
        spans.push(
          `<span style="background-color:${this.numbers.backgroundColor.value};background-image:null;display:inline-block;text-indent:0.02em;height:auto;line-height:normal;margin-right:${this.numbers.marginRight}em;border-radius:${this.numbers.backgroundRadius}px;line-height: 1">${chat}</span>`
        );
      }
    }
    // const html = renderToString(<span style={{backgroundColor: 'red'}}>123</span>)
    // console.log('html',html)
    elem.innerHTML = spans.join("");
  }
}

type NumberTitleFlopProps = CommonWidgetProps<Partial<NumberTitleFlopType>>;

const NumberTitleFlop = (props: NumberTitleFlopProps) => {
  const { widget } = props;

  // const containerRef = React.useRef<HTMLDivElement>(null);

  const { title, counter = {} as ICounter } = _.merge(
    {},
    defaultProps.props,
    widget!.props
  );
  const { numbers, prefix, suffix, fontFamily, justifyContent, margin } =
    counter;

  const dataSource = useContext(DatavDataSourceContext);
  // const value = getValue(dataSource.data, dataConfig!.source.dataRequire)
  // const value =
  //   dataConfig!.source.dataRequire.type == "array"
  //     ? dataSource.data[0].value
  //     : dataSource.data.value;
  // console.log("dataSource", dataSource);
  const value = dataSource.data[0].value;
  const titleValue = dataSource.data[0].name || title.content;
  const prefixValue = dataSource.data[0].prefix || prefix!.content;
  const suffixValue = dataSource.data[0].suffix || suffix!.content;
  const wrapper = useContext(DatavComWrapperContext);
  useEffect(() => {
    if (wrapper.container?.current) {
      // wrapper.container.current.style.background = getBackground(background) as string;
    }
  }, []);

  const plugin = useMemo(() => {
    return new DatavPlugin(numbers!);
  }, [props]);

  const titleStyle = getTextStyle(title?.textStyle);
  const prefixStyle = getTextStyle(prefix?.textStyle);
  const suffixStyle = getTextStyle(suffix?.textStyle);
  const numbersStyle = getTextStyle(numbers?.textStyle);

  return (
    <>
      {titleValue && <div style={titleStyle}>{titleValue}</div>}
      <div
        style={{
          display: "flex",
          fontFamily: fontFamily,
          justifyContent: justifyContent,
          alignItems: suffix?.suffixArrange || "baseline",
        }}
      >
        {prefixValue && (
          <span
            style={prefixStyle}
            className={css`
              margin-right: ${margin!.preNum}px;
            `}
          >
            {prefixValue}
          </span>
        )}

        <CountUp
          end={value}
          preserveValue={true}
          separator={
            numbers!.separatingChart ? numbers!.separatingSymbol : undefined
          }
          decimals={numbers!.decimal}
          duration={numbers!.duration / 1000}
          style={numbersStyle}
          className={css`
            display: flex;
            letter-spacing: ${numbers!.marginRight}em;
          `}
          plugin={plugin}
        />
        {suffixValue && (
          <span
            style={suffixStyle}
            className={css`
              margin-left: ${margin!.numSuff}px;
            `}
          >
            {suffixValue}
          </span>
        )}
      </div>
    </>
  );
};
NumberTitleFlop.displayName = "NumberTitleFlop";
NumberTitleFlop.defaultProps = defaultProps;
export default NumberTitleFlop;
