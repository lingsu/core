import getDefaultRegistry from "./getDefaultRegistry";
import schemaUtils from "./utils/schemaUtils";

const jsonGenerateTyping = (schema: any): string => {
  try {
    console.log("hello");

    const { fields, templates } = getDefaultRegistry();

    // const registry = getDefaultRegistry();
    const registry = {
      fields,
      templates,
      schemaUtils: schemaUtils(),
      definitions: {},
      rootSchema: schema,
    };

    const { SchemaField } = registry.fields;
    const idSchema = registry.schemaUtils.toIdSchema(schema, "root", schema);
    console.log("root idSchema",idSchema);

    // var body = SchemaField({ name: "root", schema, registry, idSchema });

    // console.log("registry", registry.definitions, body);
    return `

    export type xxxxxxx =
    `;
  } catch (error) {
    console.log('error',error)
    throw error;
  }
};

export default jsonGenerateTyping;
