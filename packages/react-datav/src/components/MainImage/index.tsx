import { CSSProperties, useMemo } from "react";
import _ from "lodash";
import { LayerOption, UrlConfig } from "../../typing";
import Layer from "../Layer";

const defaultProps = {
  cursor: false,
  radius: 0,
  repeat: "no-repeat",
  imageType: "bitmap",
  vectorFill: "#2483FF",
  "inner-style": {
    "no-repeat":"100% 100%",
    "repeat-x":"auto 100%",
    "repeat-y":"100% auto",
    "repeat":"auto auto",
  },
  // vectorImage: "",
  "background-image": "",
  interaction: {
    events: [],
  },
};
type MainImageProps = typeof defaultProps & {
  urlConfig: UrlConfig;
} & LayerOption;

const MainImage = (props: MainImageProps) => {
  const weightProps = _.merge({}, defaultProps, props);

  const { repeat, radius, cursor, urlConfig } = weightProps;
  const style = useMemo(() => {
    var style: CSSProperties = {
      // ...getBackgroundStyle(widget.props),
      // ...getCustomStyle(backgroundStyle),
      // ...getEllipsisStyle(ellipsis),
      // ...getTextStyle(textStyle),
      // letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
      // writingMode: writingMode,
      // display: "flex",
      // alignItems: "center",
      // cursor: "default",
      // justifyContent: justifyContent[textAlign],
      width: "100%",
      height: "100%",
      backgroundSize: props["inner-style"][repeat],
      backgroundRepeat: repeat,
      backgroundImage: weightProps["background-image"]
        ? `url(${weightProps["background-image"]})`
        : undefined,
      borderRadius: radius || 0,
      cursor: cursor ? "pointer" : "default",
    };
    // console.log("style", style);
    Object.entries(style).forEach(([key, value]) => {
      style[key] = value;
    });
    // wrapper.container.current.style.background = getBackground(background) as string;

    return style;
  }, [props]);

  
  // if (urlConfig && urlConfig.url) {
  //   return (
  //     <a
  //       href={urlConfig.url}
  //       target={urlConfig.ifBlank ? "_blank" : undefined}
  //       style={{
  //         width: "100%",
  //         height: "100%",
  //         display: "block",
  //       }}
  //     ></a>
  //   );
  // }
  return (
    <Layer {...props}>
      <div style={style}>
        {urlConfig && urlConfig.url && (
          <a
            href={urlConfig.url}
            target={urlConfig.ifBlank ? "_blank" : undefined}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          ></a>
        )}
      </div>
    </Layer>
  );
};

MainImage.displayName = "MainImage";
MainImage.defaultProps = defaultProps;
export default MainImage;
