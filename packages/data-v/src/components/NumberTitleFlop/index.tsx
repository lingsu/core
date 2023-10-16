import { useContext, useEffect, useState } from "react";
import { CommonWidgetProps, ICounter, INumbers } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import CountUp from "react-countup";
import getTextStyle from "../../utils/getTextStyle";
import { css } from "@emotion/css";
import React from "react";
import { CountUp as CountUpJs } from "countup.js";
import { DatavDataSourceContext } from "../DatavCommonHoc/context";
import getValue from "../../utils/getValue";
import _ from 'lodash';

// import { renderToString } from 'react-dom/server';

// {"main-img_4bzfk/source":{"type": "static", "isError":false,"data":[{"img":"","url":""}]},
// "main-title_qeqfb/source":{"type": "static", "isError":false,"data":[]},
// "number-title-flop_d0upt/source":{"type": "static", "isError":false,"data":[{"name":"","value":232425}]}}

const defaultProps = {
  attr: {
    h: 64,
    w: 300,
    x: 203.5170893054024,
    y: 159.0474090407938,
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
          `<span style="display:inline-block;text-indent:0.02em;height:auto;line-height:normal;font-size:36px;font-weight:bolder;margin-right:${this.numbers.marginRight}em;border-radius:0px;line-height: 1;">${chat}</span>`
        );
      } else {
        spans.push(
          `<span style="background-color:${this.numbers.backgroundColor.value};background-image:null;display:inline-block;text-indent:0.02em;height:auto;line-height:normal;font-size:36px;font-weight:bolder;margin-right:${this.numbers.marginRight}em;border-radius:${this.numbers.backgroundRadius}px;line-height: 1">${chat}</span>`
        );
      }
    }
    // const html = renderToString(<span style={{backgroundColor: 'red'}}>123</span>)
    // console.log('html',html)
    elem.innerHTML = spans.join("");
  }
}
export default (props: CommonWidgetProps) => {
  const { widget } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { title, counter = {} as ICounter, dataConfig } = _.merge({},defaultProps.props, widget.props);
  const { numbers, prefix, suffix, fontFamily, justifyContent, margin } =
    counter;

  const dataSource = useContext(DatavDataSourceContext);
  // const value = getValue(dataSource.data, dataConfig!.source.dataRequire)
  const value =
    dataConfig!.source.dataRequire.type == "array"
      ? dataSource.data[0].value
      : dataSource.data.value;

  const wrapper = useContext(DatavComWrapperContext);
  useEffect(() => {
    if (wrapper.container?.current) {
      // wrapper.container.current.style.background = getBackground(background) as string;
    }
  }, []);

  const titleStyle = getTextStyle(title?.textStyle);
  const prefixStyle = getTextStyle(prefix?.textStyle);
  const suffixStyle = getTextStyle(suffix?.textStyle);
  const numbersStyle = getTextStyle(numbers?.textStyle);

  useEffect(() => {
    const countUp = new CountUpJs(containerRef.current!, value, {
      separator: numbers.separatingChart ? numbers.separatingSymbol : undefined,
      // decimals: numbers.decimal,
      // decimalPlaces
      decimal: numbers.decimalSymbol,
      decimalPlaces: numbers.rounding ? 0 : numbers.decimal,
      duration: numbers.animation ? numbers.duration / 1000 : 0,
      plugin: new DatavPlugin(numbers),
    });
    countUp.start();
  }, []);
  return (
    <>
      {title.content && <div style={titleStyle}>{title.content}</div>}
      <div
        style={{
          display: "flex",
          fontFamily: fontFamily,
          justifyContent: justifyContent,
          alignItems: suffix?.suffixArrange || "baseline",
        }}
      >
        {prefix.content && (
          <span
            style={prefixStyle}
            className={css`
              margin-right: ${margin.preNum}px;
            `}
          >
            {prefix.content}
          </span>
        )}

        <div
          ref={containerRef}
          style={numbersStyle}
          className={css`
            letter-spacing: ${numbers.marginRight}em;
            display: flex;
          `}
        ></div>
        {/* <CountUp
          end={value}
          preserveValue={true}
          separator={
            numbers.separatingChart ? numbers.separatingSymbol : undefined
          }
          decimals={numbers.decimal}
          duration={numbers.duration / 1000}
          style={numbersStyle}
          className={css`
            letter-spacing: ${numbers.marginRight}em;
          `}
          plugin={new SomePlugin(numbers)}
        /> */}
        {suffix.content && (
          <span
            style={suffixStyle}
            className={css`
              margin-left: ${margin.numSuff}px;
            `}
          >
            {suffix.content}
          </span>
        )}
      </div>
    </>
  );
};
