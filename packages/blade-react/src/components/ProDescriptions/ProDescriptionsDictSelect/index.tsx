import {
  ProDescriptions,
  ProDescriptionsItemProps,
} from "@ant-design/pro-components";
import { OptionsConvertOption } from "@q25a25q/common";
import { useDictValueEnum } from "../../../";

export default (
  props: ProDescriptionsItemProps<Record<string, any>, "text"> & {
    dictKey: string;
    dictOption?: OptionsConvertOption;
  }
) => {
  const { children,dictKey, dictOption,  ...rest } = props;
  const subIndustryEnumValue = useDictValueEnum(dictKey, dictOption);

  return (
    <ProDescriptions.Item
      valueType="select"
      valueEnum={subIndustryEnumValue}
      {...rest}
    >
      {children}
    </ProDescriptions.Item>
  );
};
