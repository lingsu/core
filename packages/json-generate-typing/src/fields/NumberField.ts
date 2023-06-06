import { FieldProps } from "../typing";

export default (props: FieldProps) => {
  const { name, schema, registry } = props;
  // return `${name}: number`;

  return {
    type: "integer",
    // format: "int64",
    description: "",
  };
};
