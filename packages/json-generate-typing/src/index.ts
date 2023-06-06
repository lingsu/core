import getDefaultRegistry from "./getDefaultRegistry";
import definitionsUrils from "./utils/definitionsUrils";
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


    const definitionsUrilsbb = definitionsUrils();
    
    const { SchemaField } = registry.fields;
    const idSchema = registry.schemaUtils.toIdSchema(schema, "root", schema);
    console.log("root idSchema",idSchema, definitionsUrilsbb.toDefinitions(schema, idSchema, "root", schema));

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
