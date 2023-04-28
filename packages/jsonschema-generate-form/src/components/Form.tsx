import { PathSchema, Schema, StrictSchema } from "../typing";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _pick from "lodash/pick";
import _toPath from "lodash/toPath";
import getDefaultRegistry from "../getDefaultRegistry";
import { ProForm } from "@ant-design/pro-components";
import { ElementType, useRef } from "react";

export type FormProps<T = any, S extends StrictSchema = Schema> = {
  schema: S;
  formData: T;
  id?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  tagName?: ElementType;
};

// const getFieldNames =
export default (props: FormProps) => {
  const {
    schema,
    formData,
    tagName,
    disabled = false,
    readonly = false,
  } = props;
  const formElement = useRef<any>();

  const registry = getDefaultRegistry();
  const { SchemaField: _SchemaField } = registry.fields;
  const FormTag = tagName || ProForm;

  const onSubmit = (value: any) => {
    console.log("onSubmit", value);
  };
  const onChange = (changeValues: any) => {
    console.log("onChange", changeValues);
  };

  return (
    <FormTag
      formRef={formElement}
      onFinish={onSubmit}
      disabled={disabled}
      readonly={readonly}
      onValuesChange={onChange}
    >
      <_SchemaField
        name=""
        schema={schema}
        formData={formData}
        registry={registry}
      />
    </FormTag>
  );
};
