import { useContext, useEffect } from "react";
import { CommonWidgetProps } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import getBackground from "../../utils/getBackground";
import _ from "lodash";

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
  type: "ui",
  props: {
    filter: "",
    background: "#319cff",
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
const MainColorBlock = (props: CommonWidgetProps) => {
  const { widget } = props;

  const weightProps = _.merge({}, defaultProps.props, widget!.props);

  const { background } = weightProps;
  const wrapper = useContext(DatavComWrapperContext);
  useEffect(() => {
    if (wrapper.container?.current) {
      wrapper.container.current.style.background = getBackground(
        background
      ) as string;
    }
  }, []);
  return null;
};
MainColorBlock.displayName = "MainColorBlock";
MainColorBlock.defaultProps = defaultProps;
export default MainColorBlock;
