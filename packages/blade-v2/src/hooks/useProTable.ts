import { ActionType, ProTableProps } from "@ant-design/pro-components";
import { useErrorBoundary } from "react-error-boundary";
import request from "../utils/request";
import { useRef } from "react";

type UseProTableProps<DataType, Params, ValueType> = {
  url: string;
} & ProTableProps<DataType, Params, ValueType>;

export default <DataType = any, Params=any, ValueType = any>(
  props: UseProTableProps<DataType, Params, ValueType>
) => {
  const { url, ...rest } = props;
  const actionRef = useRef<ActionType>();

  const { showBoundary } = useErrorBoundary();
  return [
    {
      columns: props.columns,
      //   actionRef: actionRef,
      cardBordered: true,
      //   request: getBroadHeadingList,
      rowKey: "id",
      onRequestError: (error: Error) => {
        showBoundary(error);
      },
      request: (params: any = {}) => {
        const { pageSize, area, ...rest } = params;

        var urlSearchParams = {
          ...rest,
          size: pageSize,
        };

        return request.getPage<any>(url, {params: urlSearchParams});
      },
      search: {
        labelWidth: "auto",
      },
      options: {
        setting: {
          listsHeight: 400,
        },
      },
      form: {
        syncToUrl: true,
      },
      pagination: {
        pageSize: 20,
      },
      dateFormatter: "string",
      ...rest,
    } as ProTableProps<DataType, Params, ValueType>,
    {
      actionRef
    }
  ];
};
