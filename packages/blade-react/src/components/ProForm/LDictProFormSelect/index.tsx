// import { useSystemDictIntMap } from '@/andy/hooks/useSystemDict';
import {
  ProFormSelect,
  ProFormSelectProps,
  RequestOptionsType,
} from "@ant-design/pro-components";
import { Options, optionsConvert, OptionsConvertOption } from "@q25a25q/common";
import { createApi } from "../../../";

// import createApi from "@q25a25q/blade"

// const api = createApi();
export default (
  props: ProFormSelectProps & {
    dictKey: "string";
    dickOption?: OptionsConvertOption;
  }
) => {
  const { dictKey, dickOption, ...rest } = props;
  // const qualificationsEnumValue = useSystemDictIntMap(dictKey);

  // createApi().services.dict.getList(dictKey)
  // webApi
  // webApi.services.dict.getList({
  //   current: 1,
  //   size:100
  // }).then((data) => {
  //   console.log('dict', data);
  //   setDataSource(data);
  // });
  // createApi()

  return (
    <ProFormSelect
      request={async () => {
        var api = createApi();
        var items = await api.services.dict.getDictionaryTree({
          code: dictKey,
        });

        return optionsConvert(items, dickOption) as RequestOptionsType[];
      }}
      {...rest}
    />
  );
};
