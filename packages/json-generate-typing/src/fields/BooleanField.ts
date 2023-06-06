import { FieldProps } from "../typing";

export default (props: FieldProps) => {
  const { name, schema, registry } = props;
  // return `${name}: boolean`;
  return {
    type: "boolean",
    // format: "int64",
    description: "",
  };
}