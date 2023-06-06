import { ID_KEY } from "../constants";
import { FieldProps, IdSchema, Registry } from "../typing";
import guessType from "../utils/guessType";
import mergeObjects from "../utils/mergeObjects";

const COMPONENT_TYPES: { [key: string]: string } = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField",
};

const getFieldComponent = (schemaType: any, registry: Registry) => {
  const { fields } = registry;

  // const schemaType = getSchemaType(schema);
  // const type: string = Array.isArray(schemaType)
  //   ? schemaType[0]
  //   : schemaType || "";

  var type = guessType(schemaType);
  const componentName = COMPONENT_TYPES[type];

  return componentName in fields
    ? fields[componentName]
    : () => {
        return `UnsupportedFieldTemplate[${componentName}]`;
      };
};

export default (props: FieldProps) => {
  const {
    name,
    registry,
    schema,
    idSchema: _idSchema,
    // uiSchema,
  } = props;

  console.log('SchemaField',props)
  const { schemaUtils } = registry;
  const fieldId = _idSchema[ID_KEY];

  const idSchema = mergeObjects(
    schemaUtils.toIdSchema(schema, fieldId, schema),
    _idSchema
  ) as IdSchema;
  
  const id = idSchema[ID_KEY];

  return getFieldComponent(
    schema,
    registry
  )({ name, schema, registry, idSchema: idSchema });
};
