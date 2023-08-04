import { css } from '@emotion/css'
import React, { forwardRef, useRef, useEffect, useCallback } from "react";

export default (pros: { children: React.ReactNode}) => {
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        overflow: auto;
        flex: 1 1;
      `}
    >
      <div
        className={css`
          width: 100%;
          height: 100%;
        `}
      >
        <div
          className={css`
            display: block;
            height: 100%;
            width: 100%;
            opacity: 1;
            position: relative;
            transform: rotate(0deg) scaleX(1) scaleY(1) rotateZ(360deg);
          `}
        >
          <div
            className={css`
              transform-origin: left top;
              height: 100%;
              width: 100%;
              position: relative;
              overflow: inherit;
              transform: translate(0, 0);
            `}
          >
            {pros.children}
          </div>
        </div>
      </div>
    </div>
  );
};
