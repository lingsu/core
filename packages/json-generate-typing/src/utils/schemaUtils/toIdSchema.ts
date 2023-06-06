import { ID_KEY } from "../../constants";
import { IdSchema } from "../../typing";
import guessType from "../guessType";
import isObject from "../isObject";

const toIdSchemaInternal = (
  schema: any,
  idSeparator: string,
  id?: string | null,
  rootSchema?: any,
  _recurseList: any[] = []
) => {
  // if (ID_KEY in schema) {

  // }
  // console.log("idschema", schema, id, rootSchema);
  let $id = id;

  const idSchema: IdSchema = { $id } as IdSchema;

  var type = guessType(schema);

  if (type === "object") {
    Object.keys(schema).forEach((key) => {
      const field = schema[key];
      const fieldId = idSchema[ID_KEY] + idSeparator + key;
      idSchema[key] = toIdSchemaInternal(
        isObject(field) ? field : {},
        idSeparator,
        fieldId,
        rootSchema
      );
    });
    // for (const name in schema.properties) {
    //     const field = get(schema, [PROPERTIES_KEY, name]);
    //     const fieldId = idSchema[ID_KEY] + idSeparator + name;
    //     idSchema[name] = toIdSchemaInternal<T, S, F>(
    //       validator,
    //       isObject(field) ? field : {},
    //       idPrefix,
    //       idSeparator,
    //       fieldId,
    //       rootSchema,
    //       // It's possible that formData is not an object -- this can happen if an
    //       // array item has just been added, but not populated with data yet
    //       get(formData, [name]),
    //       _recurseList
    //     );
    //   }
  }

  return idSchema;
};
export default (schema: any, id?: string | null, rootSchema?: any,idSeparator = '_') => {
  return toIdSchemaInternal(schema, idSeparator, id, rootSchema,);
};
