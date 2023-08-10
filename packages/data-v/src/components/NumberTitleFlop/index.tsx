import { useContext, useEffect, useState } from "react";
import { CommonWidgetProps, ICounter, INumbers } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import CountUp from "react-countup";
import getTextStyle from "../../utils/getTextStyle";
import { css } from "@emotion/css";
import React from "react";
import { CountUp as CountUpJs } from "countup.js";

// import { renderToString } from 'react-dom/server';

// {"main-img_4bzfk/source":{"type": "static", "isError":false,"data":[{"img":"","url":""}]},
// "main-title_qeqfb/source":{"type": "static", "isError":false,"data":[]},
// "number-title-flop_d0upt/source":{"type": "static", "isError":false,"data":[{"name":"","value":232425}]}}
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
          `<span style="display:inline-block;text-indent:0.02em;height:auto;line-height:normal;font-size:36px;font-weight:bolder;margin-right:0.2em;border-radius:0px;line-height: 1;">${chat}</span>`
        );
      } else {
        spans.push(
          `<span style="background-color:${this.numbers.backgroundColor.value};background-image:null;display:inline-block;text-indent:0.02em;height:auto;line-height:normal;font-size:36px;font-weight:bolder;margin-right:0.2em;border-radius:${this.numbers.backgroundRadius}px;line-height: 1">${chat}</span>`
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
  const [value, setValue] = useState(232425);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { title, counter = {} as ICounter } = widget.props;
  const { numbers, prefix, suffix, fontFamily, justifyContent, margin } =
    counter;
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
    const countUp = new CountUpJs(containerRef.current!, 5234, {
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
      {title && <div style={titleStyle}>{title.content}</div>}
      <div
        style={{
          display: "flex",
          fontFamily: fontFamily,
          justifyContent: justifyContent,
          alignItems: "baseline",
        }}
      >
        {prefix && (
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
        {suffix && (
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
