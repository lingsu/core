import { CommonWidgetProps, IDataConfig, ISource } from "../../typing";
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
  // console.log(
  //   "DataWrapper",
  //   props.widget,
  //   (props.children! as any).type.defaultProps?.dataConfig
  // );

  const dataConfig: IDataConfig = _.merge(
    {},
    (props.children! as any).type.defaultProps?.dataConfig,
    props.widget?.props?.dataConfig
  );
  const source = dataConfig.source;
  // console.log("DataWrapper", dataConfig);
  const dataSourceType = source.dataSource[source.dataSourceType];

  var id =
    dataSourceType.$type == "static"
      ? props.widget.id + "/source"
      : dataSourceType.api!.url;
  const { data, isLoading } = useSWR(id, () => {
    // return [];

    const dataRequire = source.dataRequire;

    var dataSource = dataSourceType[dataSourceType.$type];
    if (!dataSource) {
      return [];
    }

    const dataRequireMapping = (data: any) => {
      const { mapping = {}} = dataRequire.extension || {}
      // console.log('data',data, mapping, Object.keys(data[0]))
      return data.map((it:any)=> {
        return Object.keys(it).reduce((acc:any,key:string) => {
          if (key in mapping) {
            acc[mapping[key]] = it[key];
          }else{
            acc[key] = it[key];
          }
          return acc;
        },{} as any)
      });
    };

    if (dataSource.type === "static") {
      return dataRequireMapping(dataSource.data);
    }

    return new Promise((res) => {
      _.delay(
        function (text) {
          console.log(text);
          res(dataRequireMapping([]));
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
        {props?.dataConfig?.source?.name ? (
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
