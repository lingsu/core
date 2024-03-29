import { CommonWidgetProps, IDataConfig, ISource } from "../../typing";
import DatavComWrapper from "../DatavComWrapper";
import useSWR from "swr";
import { DatavDataSourceContextProvider } from "./context";
import * as _ from "lodash";
import { useId } from "react";

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
  const rid = useId();

  const dataConfig: IDataConfig = _.merge(
    {
      source: {
        name: "接口描述",
        handler: "render",
        dataSource: {
          multiple: {
            $type: "static",
          },
        },
        // dataRequire: {
        //   type: "array",
        //   items: {
        //     type: "object",
        //     required: ["percent"],
        //     properties: {
        //       percent: {
        //         type: ["string"],
        //         extension: {
        //           description: "进度百分比",
        //         },
        //       },
        //     },
        //   },
        //   extension: {},
        // },
        description: "接口描述",
        dataSourceType: "multiple",
      },
    },
    (props.children! as any).type?.defaultProps?.dataConfig,
    props.widget?.dataConfig
  );
  const source = dataConfig.source;
  // console.log("DataWrapper", dataConfig,props.widget);
  const dataSourceType = source.dataSource[source.dataSourceType];
  // console.log("dataSourceType",props, dataSourceType);
  var id =
    dataSourceType.$type == "static"
      ? (props.widget.id || rid) + "/source"
      : dataSourceType.api!.url;
  const { data, isLoading } = useSWR(id, () => {
    // return [];

    // const dataRequire = source.dataRequire;

    var dataSource = dataSourceType[dataSourceType.$type];
    if (!dataSource) {
      return [];
    }
    const dataRequireMapping = (data: any) => {

      const { mapping = {} } = source.dataRequire?.extension || {};
      // console.log('data',data, mapping, Object.keys(data[0]))
      return data.map((it: any) => {
        return Object.keys(it).reduce((acc: any, key: string) => {
          if (key in mapping) {
            acc[mapping[key]] = it[key];
          } else {
            acc[key] = it[key];
          }
          return acc;
        }, {} as any);
      });
    };

    if (dataSourceType.$type === "static") {
      return dataRequireMapping(dataSource);
    }

    return new Promise((res) => {
      _.delay(
        function (text) {
          console.log('get data by api',text);
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
  const { hide = false, degree = 0, opacity = 1, flipH, flipV } = { ...common };
  // console.log('first',props?.dataConfig, props?.dataConfig?.source?.name)
  return (
    <div
      className="datav-common-hoc"
      style={{
        display: "block",
        height: "100%",
        width: "100%",
        opacity: opacity,
        position: "relative",
        transform: `rotate(${degree}deg) scaleX(${flipH ? -1 : 1}) scaleY(${
          flipV ? -1 : 1
        }) rotateZ(360deg)`,
        // onClick={onClick}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
      }}
    >
      <DatavComWrapper widget={widget}>
        {/* {props?.dataConfig?.source?.name ? (
          <DataWrapper widget={widget} LoadingComponent={LoadingComponent}>
            {children}
          </DataWrapper>
        ) : (
          children
        )} */}
        <DataWrapper widget={widget} LoadingComponent={LoadingComponent}>
          {children}
        </DataWrapper>
      </DatavComWrapper>

      {/* <DatavDataSourceContextProvider value={{ data: data }}>
        <DatavComWrapper widget={widget}>
          {isLoading ? LoadingComponent || <DefaultLoading /> : children}
        </DatavComWrapper>
      </DatavDataSourceContextProvider> */}
    </div>
  );
};
