import getDefaultRegistry from "./getDefaultRegistry";
import definitionsUtils from "./utils/definitionsUtils";
import schemaUtils from "./utils/schemaUtils";
import typescriptTypingUtils from "./utils/typescriptTypingUtils";





const jsonGenerateTyping = (schema: any): string => {
  try {
    console.log("hello");

    const { fields, templates } = getDefaultRegistry();

    // const registry = getDefaultRegistry();
    const registry = {
      fields,
      templates,
      schemaUtils: schemaUtils(),
      definitionsUtils: definitionsUtils(),
      definitions: {},
      rootSchema: schema,
    };


    
    const { SchemaField } = registry.fields;

    var id = "root" +  Date.now();
    const idSchema = registry.schemaUtils.toIdSchema(schema, id, schema, "");
    var definitions = registry.definitionsUtils.toDefinitions(schema, idSchema, id, schema,"");

    console.log("root idSchema",idSchema, definitions);

    // var body = SchemaField({ name: "root", schema, registry, idSchema });

    // console.log("registry", registry.definitions, body);
    return typescriptTypingUtils().toTypingString(definitions);
    // return `

    // export type xxxxxxx =
    // `;
  } catch (error) {
    console.log('error',error)
    throw error;
  }
};

export default jsonGenerateTyping;
