import UpMarquee from "../../UpMarquee";
import { DatavDataSourceContext } from "../DatavCommonHoc/context";
import _ from "lodash";
import { CommonWidgetProps } from "../../typing";
import { memo, useMemo } from "react";

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
  type: "ui",
  props: {
    // itemHeaderRender: (data:any) => <span></span>,
  },
};

type CustomLayerType = {
  itemRender:  () => JSX.Element;
}
type CustomLayerProps =
  CommonWidgetProps<CustomLayerType>;

const CustomLayer = (props: CustomLayerProps) => {
  // // const wrapper = useContext(DatavComWrapperContext);
  // const dataSource = useContext(DatavDataSourceContext);

  const { widget } = props;
  const weightProps = _.merge({}, defaultProps.props, widget.props);
  const { itemRender } = weightProps;
  const Render = useMemo(() => itemRender, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
     <Render />
    </div>
  );
};

CustomLayer.displayName = "CustomLayer";
CustomLayer.defaultProps = defaultProps;
export default memo(CustomLayer);
