// import { useSystemDictIntMap } from '@/andy/hooks/useSystemDict';
import {
  ProFormSelect,
  ProFormSelectProps,
  RequestOptionsType,
} from "@ant-design/pro-components";
import { Options, optionsConvert, OptionsConvertOption } from "@q25a25q/common";
import { createApi, useRegionValueEnum } from "../../../";

// import createApi from "@q25a25q/blade"

// const api = createApi();
export default (
  props: ProFormSelectProps & {
    regionCode?: "string";
    regionOption?: OptionsConvertOption;
  }
) => {
  const { regionCode, regionOption, ...rest } = props;
  const regionValueEnum = useRegionValueEnum(regionCode, regionOption);
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

  return <ProFormSelect valueEnum={regionValueEnum} {...rest} />;
};
