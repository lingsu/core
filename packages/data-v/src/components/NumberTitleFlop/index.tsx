import { useContext, useEffect, useState } from "react";
import { CommonWidgetProps, ICounter } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import CountUp from "react-countup";
import getTextStyle from "../../utils/getTextStyle";
import { css } from "@emotion/css";
import React from "react";
import { CountUp as CountUpJs } from "countup.js";

// {"main-img_4bzfk/source":{"type": "static", "isError":false,"data":[{"img":"","url":""}]},
// "main-title_qeqfb/source":{"type": "static", "isError":false,"data":[]},
// "number-title-flop_d0upt/source":{"type": "static", "isError":false,"data":[{"name":"","value":232425}]}}
export class SomePlugin {
  // ...some properties here
  constructor(style: any) {
    // ...setup code here if you need it
    console.log("SomePlugin");
  }
  render(elem: HTMLElement, formatted: string): void {
    // render DOM here
    console.log("formatted", elem, formatted);
    // elem.innerHTML =
    var spans: string[] = [];
    for (let i = 0; i < formatted.length; i++) {
      const chat = formatted[i];
      if (chat == ",") {
        spans.push(`<span>${chat}</span>`);
      } else {
        spans.push(
          `<span style="background:blue; border-radius: 10px">${chat}</span>`
        );
      }
    }
    elem.innerHTML = spans.join("");
  }
}
export default (props: CommonWidgetProps) => {
  const { widget } = props;
  const [value, setValue] = useState(232425);

  const containerRef = React.useRef<HTMLElement>(null);

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
      plugin: new SomePlugin(numbersStyle),
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

        <span
          ref={containerRef}
          style={numbersStyle}
          className={css`
            letter-spacing: ${numbers.marginRight}em;
          `}
        ></span>
        <CountUp
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
          plugin={new SomePlugin(numbersStyle)}
        />
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
