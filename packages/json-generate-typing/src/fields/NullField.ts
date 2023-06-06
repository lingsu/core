import { FieldProps } from "../typing";

export default (props: FieldProps) => {
  const { name, schema, registry } = props;
  // return `${name}: any`;

  return {
    type: "string",
    // format: "int64",
    description: "",
  };
}