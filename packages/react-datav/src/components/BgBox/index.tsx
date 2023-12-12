import { CSSProperties, useMemo } from "react";
import _ from "lodash";
import { LayerOption } from "../../typing";
import Layer from "../Layer";
const defaultProps = {
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

  // interaction: {
  //   events: [],
  //   logicNodes: [],
  // },
};
type BgBoxProps = typeof defaultProps & LayerOption;

const BgBox = (props: BgBoxProps) => {
  const weightProps = _.merge({}, defaultProps, props);
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
        style.borderImage = `url("${border.customImage.source}") ${border.customImage.slice} / ${border.customImage.width} / ${border.customImage.outset} stretch`;
      }
    }

    return style;
  }, [props]);

  var background = _.last(fills);

  return (
    <Layer {...props}>
      <div style={innerStyle}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: background!.fillwp.fill.value,
            opacity: background!.fillwp.opacity / 100,
          }}
        ></div>
      </div>
    </Layer>
  );
};
BgBox.displayName = "BgBox";
BgBox.defaultProps = defaultProps;
export default BgBox;
