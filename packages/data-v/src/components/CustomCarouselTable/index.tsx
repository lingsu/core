import { Fragment, useContext } from "react";
import UpMarquee from "../../UpMarquee";
import { DatavDataSourceContext } from "../DatavCommonHoc/context";
import _ from "lodash";
import { CommonWidgetProps } from "../../typing";

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
    // itemRender: (data:any) => <span></span>,
  },
};

type CarouselTableCustomType = {
  itemRender: (data: any, index: number) => JSX.Element;
}
type CarouselTableCustomProps =
  CommonWidgetProps<CarouselTableCustomType>;

const CarouselTableCustom = (props: CarouselTableCustomProps) => {
  // // const wrapper = useContext(DatavComWrapperContext);
  const dataSource = useContext(DatavDataSourceContext);

  const { widget } = props;
  const weightProps = _.merge({}, defaultProps.props, widget.props);
  const { itemRender } = weightProps;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <UpMarquee>
        {dataSource.data?.map((item:any, index:any) => {
          return <Fragment key={index}>
            {itemRender(item,index)}
          </Fragment>
        })}
      </UpMarquee>
    </div>
  );
};

CarouselTableCustom.displayName = "CarouselTableCustom";
CarouselTableCustom.defaultProps = defaultProps;
export default CarouselTableCustom;
