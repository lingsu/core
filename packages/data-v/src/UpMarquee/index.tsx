import { keyframes, css } from "@emotion/css";
import { PropsWithChildren, useState, useRef, useEffect, useMemo, useCallback, Fragment } from "react";

const bounce = keyframes`
0%{  
  transform: translateY(0%);
  }  
  100%{  
  transform: translateY(-100%);
  }  
`;
const UpMarquee = (props: PropsWithChildren<unknown>) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [marqueeHeight, setMarqueeHeight] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const calculateHeight = () => {
    if (marqueeRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const marqueeRect = marqueeRef.current.getBoundingClientRect();
      let containerHeight = containerRect.height;
      let marqueeHeight = marqueeRect.height;
    //   console.log("containerHeight", containerHeight);
    //   console.log("marqueeHeight", marqueeHeight);

      setMultiplier(
        marqueeHeight < containerHeight
          ? Math.ceil(containerHeight / marqueeHeight)
          : 1
      );

      setContainerHeight(containerHeight);
      setMarqueeHeight(marqueeHeight);
    }
  };

  useEffect(() => {
    calculateHeight();
  }, []);

  // Animation duration
  const duration = useMemo(() => {
    // if (autoFill) {
    //   return (marqueeHeight * multiplier) / speed;
    // } else {
    // return marqueeHeight < containerHeight
    //   ? containerHeight / 50
    //   : marqueeHeight / 50;
    // }
    return (marqueeHeight * multiplier) / 50;
  }, [containerHeight, marqueeHeight, multiplier]);

  // Render {multiplier} number of children
  const multiplyChildren = useCallback(
    (multiplier: number) => {
      return [
        ...Array(
          Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 0
        ),
      ].map((_, i) => <Fragment key={i}>{props.children}</Fragment>);
    },
    [props.children]
  );

  const marqueeStyle = {
    animation: `${bounce} ${duration}s linear 0s infinite`,
  };
  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      className={css`
        :hover div {
          animation-play-state: paused !important;
        }
      `}
    >
      <div
        // className={css`

        //  animation-name: scroll;
        //  animation-duration: 5s;
        //  animation-timing-function: linear;
        //  animation-iteration-count: infinite;

        //  `}
        // style={{ display: "flex", flexDirection: "column", rowGap: 8 }}
        style={marqueeStyle}
      >
        <div
          ref={marqueeRef}
          // style={marqueeStyle}
        >
          {props.children}
        </div>
        {multiplyChildren(multiplier - 1)}
      </div>
      <div style={marqueeStyle}>{multiplyChildren(multiplier)}</div>
    </div>
  );
};

export default UpMarquee;