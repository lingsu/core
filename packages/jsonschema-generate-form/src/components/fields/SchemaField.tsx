const COMPONENT_TYPES: { [key: string]: string } = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField",
};

export default (props: any) => {
  const {
    name,
    registry,
    schema: _schema,
    idSchema: _idSchema,
    uiSchema,
    formData,
  } = props;

  return <div>schema field</div>;
};
