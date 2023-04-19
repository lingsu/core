import { PathSchema, Schema, StrictSchema } from "../typing";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _pick from "lodash/pick";
import _toPath from "lodash/toPath";
import getDefaultRegistry from "../getDefaultRegistry";

export type FormProps<S extends StrictSchema = Schema> = {
  schema: S;
  formData: any;
};

export default (props: FormProps) => {
  const { schema, formData } = props;

  const registry = getDefaultRegistry();
  const { SchemaField: _SchemaField } = registry.fields;
  return (
    <div>
      <_SchemaField
        name=""
        schema={schema}
        formData={formData}
        registry={registry}
      />
    </div>
  );
};
