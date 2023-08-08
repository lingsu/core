import { useContext, useEffect } from "react";
import { CommonWidgetProps } from "../../typing";
import { DatavComWrapperContext } from "../DatavComWrapper/context";
import getBackground from "../../utils/getBackground";


export default (props: CommonWidgetProps) => {
  const { widget } = props;

  const {
    background
  } = widget.props;
  const wrapper = useContext(DatavComWrapperContext);
  useEffect(() => {
    if (wrapper.container?.current) {
      wrapper.container.current.style.background = getBackground(background) as string;
    }
  }, []);
  return null
};
