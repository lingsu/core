import { ProSchemaValueEnumObj } from "@ant-design/pro-components";
import { OptionsConvertOption } from "@q25a25q/common";
import { useRegionRequestOptions } from "..";

export default (code?: string, dictOption?: OptionsConvertOption) => {
  const dataSource = useRegionRequestOptions(code, dictOption);

  return dataSource.reduce((acc, value) => {
    return {
      ...acc,
      [value.value!]: {
        text: value.label,
      },
    };
  }, {}) as ProSchemaValueEnumObj;
};
