import { FieldProps } from "../typing";

export default (props: FieldProps) => {
  const { name, schema, registry, idSchema } = props;
  const { SchemaField } = registry.fields;



  return {
    type: "array",
    // format: "int64",
    def: SchemaField({name: name, schema: schema[0], registry, idSchema}),
    description: "",
  };
  
}