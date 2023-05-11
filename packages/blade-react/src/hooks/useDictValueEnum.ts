import { ProSchemaValueEnumObj } from "@ant-design/pro-components";
import { OptionsConvertOption } from "@q25a25q/common";
import { useDictRequestOptions } from "..";

export default (dictKey: string, dictOption?: OptionsConvertOption) => {
  const dataSource = useDictRequestOptions(dictKey, dictOption);

  return dataSource.reduce((acc, value) => {
    return {
      ...acc,
      [value.value!]: {
        text: value.label,
      },
    };
  }, {}) as ProSchemaValueEnumObj;
};
