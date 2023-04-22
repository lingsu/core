import { FieldProps, Registry, Schema } from "../../typing";
import getSchemaType from "../../utils/getSchemaType";
import getTemplate from "../../utils/getTemplate";

const COMPONENT_TYPES: { [key: string]: string } = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField",
};

const getFieldComponent = (schema: Schema, registry: Registry) => {
  const { fields } = registry;

  const schemaType = getSchemaType(schema);
  const type: string = Array.isArray(schemaType)
    ? schemaType[0]
    : schemaType || "";
  const componentName = COMPONENT_TYPES[type];

  return componentName in fields
    ? fields[componentName]
    : () => {
        return <div>UnsupportedFieldTemplate</div>;
      };
};

export default (props: FieldProps) => {
  const {
    name,
    registry,
    schema: _schema,
    // idSchema: _idSchema,
    // uiSchema,
    // formData,
  } = props;

  const FieldTemplate = getTemplate('FieldTemplate', registry);


  const FieldComponent = getFieldComponent(_schema, registry);
  const field = (
    <FieldComponent
      {...props}
      // onChange={handleFieldComponentChange}
      // idSchema={idSchema}
      // schema={schema}
      // uiSchema={fieldUiSchema}
      // disabled={disabled}
      // readonly={readonly}
      // hideError={hideError}
      // autofocus={autofocus}
      // errorSchema={fieldErrorSchema}
      // formContext={formContext}
      // rawErrors={__errors}
    />
  );

  const fieldProps = {
    
  }
  return <FieldTemplate id="">
    {field}
  </FieldTemplate>;
};
