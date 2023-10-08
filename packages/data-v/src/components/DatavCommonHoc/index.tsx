import { CommonWidgetProps } from "../../typing";
import DatavComWrapper from "../DatavComWrapper";
import useSWR from "swr";
import { DatavDataSourceContextProvider } from "./context";
import * as _ from "lodash";

type MainColorBlockProps = {} & CommonWidgetProps;

const DefaultLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      加载中...
    </div>
  );
};

const DataWrapper = (props: CommonWidgetProps) => {
  const source = props.widget.props.dataConfig!.source;
  var id =
    source.dataSource.multiple.$type == "static"
      ? props.widget.id + "/source"
      : source.dataSource.multiple.api!.url;
  const { data, isLoading } = useSWR(id, () => {
    // return [];

    var dataSource =
      source.dataSource.multiple[source.dataSource.multiple.$type];

    if (dataSource.type === "static") {
      return dataSource.data;
    }

    return new Promise((res) => {
      _.delay(
        function (text) {
          console.log(text);
          res([]);
        },
        3000,
        []
      );
    });
  });
  // console.log("DataWrapper id", id, data, isLoading);

  return (
    <DatavDataSourceContextProvider value={{ data: data }}>
      {isLoading
        ? props.LoadingComponent || <DefaultLoading />
        : props.children}
    </DatavDataSourceContextProvider>
  );
};

export default ({
  widget,
  children,
  LoadingComponent,
}: MainColorBlockProps) => {
  const { common, props, attr, id } = widget;
  const { hide = false, degree = 0, opacity = 1 } = { ...common };
  // console.log("dataConfig", widget);
  return (
    <div
      className="datav-common-hoc"
      style={{
        display: "block",
        height: "100%",
        width: "100%",
        opacity: opacity,
        position: "relative",
        transform: `rotate(${degree}deg) scaleX(1) scaleY(1) rotateZ(360deg)`,
        // onClick={onClick}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
      }}
    >
      <DatavComWrapper widget={widget}>
        {props.dataConfig?.source?.name ? (
          <DataWrapper widget={widget} LoadingComponent={LoadingComponent}>
            {children}
          </DataWrapper>
        ) : (
          children
        )}
      </DatavComWrapper>

      {/* <DatavDataSourceContextProvider value={{ data: data }}>
        <DatavComWrapper widget={widget}>
          {isLoading ? LoadingComponent || <DefaultLoading /> : children}
        </DatavComWrapper>
      </DatavDataSourceContextProvider> */}
    </div>
  );
};
