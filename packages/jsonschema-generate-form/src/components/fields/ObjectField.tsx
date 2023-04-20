import { FieldProps } from "../../typing"

export default (props: FieldProps) => {
    const {
        schema: rawSchema,
        name,
        registry,
      } = props;

    return <div>object field</div>
}