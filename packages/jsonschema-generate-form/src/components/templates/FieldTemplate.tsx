import { ProFormText } from "@ant-design/pro-components";
import { FieldTemplateProps } from "../../typing";

export default (props: FieldTemplateProps) => {
  const { children } = props;
  return (
    <div>
      Field Template:
      {children}
      {/* <ProFormText
        name={["contract", "name"]}
        width="md"
        label="合同名称"
        placeholder="请输入名称"
      /> */}
    </div>
  );
};
