import { CSSProperties, useMemo } from "react";
import { CommonWidgetProps } from "../../typing";
import _ from "lodash";

const defaultProps = {
  attr: {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    hUnit: "px",
    wUnit: "px",
    xUnit: "px",
    yUnit: "px",
  },
  list: [],
  name: "bg-box",
  type: "ui",
  props: {
    fills: [
      {
        fillwp: {
          fill: {
            type: "flat",
            value: "#003a8c",
          },
          opacity: 0,
        },
      },
    ],
    border: {
      flat: {
        color: "#008bff",
        curve: "polyline",
        style: "solid",
        width: 1,
      },
      show: true,
      type: "flat",
      imageType: "custom",
      customImage: {
        slice: "32 37 fill",
        width: "32px 37px",
        outset: "0",
        repeat: "no-repeat",
        source: "",
      },
      presetImage: "box38",
      linearGradient: {
        color: {
          angle: 135,
          stops: [
            {
              color: "#00DEFF",
              offset: 0,
            },
            {
              color: "#008BFF",
              offset: 100,
            },
          ],
        },
        width: 2,
      },
    },
    filter: {
      blur: "0px",
    },
    urlConfig: {
      url: "",
      ifBlank: false,
    },
    backdropFilter: {
      blur: "0px",
    },
    customBorderRadius: {
      all: 0,
      type: "all",
      fourCorners: {
        topLeft: 0,
        topRight: 0,
        bottomLeft: 0,
        bottomRight: 0,
      },
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
  dataConfig: {},
  interaction: {
    events: [],
    logicNodes: [],
  },
};
type BgBoxProps = CommonWidgetProps<typeof defaultProps.props>;

const BgBox = (props: BgBoxProps) => {

  const { widget } = props;
  const weightProps = _.merge({}, defaultProps.props, widget.props);
  const { fills, border } = weightProps;
  // var background = _.last(fills);

  const innerStyle = useMemo(() => {
    const style: CSSProperties = {
      width: "100%",
      height: "100%",
    };

    if (border.show) {
      if (border.type === "flat") {
        style.border = `${border.flat.width}px ${border.flat.style} ${border.flat.color}`;
      } else if (border.type === "linearGradient") {
        style.borderWidth = border.linearGradient.width;
        style.borderImage = `linear-gradient(${border.linearGradient.color.angle}deg, ${border.linearGradient.color.stops[0].color} ${border.linearGradient.color.stops[0].offset}%, ${border.linearGradient.color.stops[1].color} ${border.linearGradient.color.stops[0].offset}%) 10 / ${border.linearGradient.width}px / 0 stretch`;
      } else {
        style.borderWidth = border.linearGradient.width;
        // style.backgroundImage = `url(${border.customImage.source})`;
        // style.backgroundRepeat = border.customImage.repeat;
        style.borderImage = `url("${border.customImage.source}") ${border.customImage.slice} / ${border.customImage.width} / ${border.customImage.outset} stretch`
      }
    }

    return style;
  }, [props]);

    var background = _.last(fills);

  return <div style={innerStyle}>
    <div style={{
      width: "100%",
      height: "100%",
      backgroundColor: background!.fillwp.fill.value,
      opacity: background!.fillwp.opacity / 100,
    }}></div>
  </div>;
};
BgBox.displayName = "BgBox";
BgBox.defaultProps = defaultProps;
export default BgBox;
