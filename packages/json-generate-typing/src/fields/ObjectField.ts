import { ID_KEY } from "../constants";
import { FieldProps, IdSchema } from "../typing";
import guessType from "../utils/guessType";
import SchemaField from "./SchemaField";

export default (props: FieldProps) => {
  const { name, schema, registry, idSchema } = props;
  const id = idSchema[ID_KEY];

  const properties = Object.keys(schema);
  // var className = name[0].toUpperCase() + name.substring(1);

  console.log("props", props);
  // if (name) {
  //   var className = name[0].toUpperCase() + name.substring(1);
  registry.definitions[id] = properties.reduce(
    (acc, prop) => {
      const fieldIdSchema = idSchema[prop];
      console.log("fieldIdSchema", fieldIdSchema);

      acc.properties[prop] = SchemaField({
        name: prop,
        schema: schema[prop],
        registry: registry,
        idSchema: fieldIdSchema!,
      });
      return acc;

      // var type = guessType(schema[prop]);

      // acc.properties[prop] = {
      //   type: type,
      //   // format: "int64",
      //   description: "",
      // };
      // return acc;
    },
    {
      type: "object",
      properties: {},
    }
  );

  //   return `${name}:${className}`;
  // }

  // return `{

  //       ${properties
  //         .map((prop) =>
  //           SchemaField({
  //             name: prop,
  //             schema: schema[prop],
  //             registry: registry,
  //           })
  //         )
  //         .join(";\r\n")}
  //    }`;

  return {
    type: "object",
    properties: properties.reduce((acc, prop) => {
      const fieldIdSchema = idSchema[prop];
      const fieldId = idSchema[ID_KEY];

      console.log("fieldIdSchema", fieldIdSchema);
      acc[prop] = SchemaField({
        name: prop,
        schema: schema[prop],
        registry: registry,
        idSchema: fieldIdSchema!,
      });
      return acc;
    }, {}),
  };
};
