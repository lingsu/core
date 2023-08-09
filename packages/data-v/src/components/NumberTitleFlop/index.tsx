import { useContext, useEffect, useState } from "react";
import { CommonWidgetProps, ICounter } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import CountUp from "react-countup";
import getTextStyle from "../../utils/getTextStyle";
import { css } from "@emotion/css";

// {"main-img_4bzfk/source":{"type": "static", "isError":false,"data":[{"img":"","url":""}]},
// "main-title_qeqfb/source":{"type": "static", "isError":false,"data":[]},
// "number-title-flop_d0upt/source":{"type": "static", "isError":false,"data":[{"name":"","value":232425}]}}

export default (props: CommonWidgetProps) => {
  const { widget } = props;
  const [value, setValue] = useState(232425);
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
