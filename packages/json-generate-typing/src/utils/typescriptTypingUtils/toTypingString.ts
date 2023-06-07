import { REF_KEY } from "../../constants";

const COMPONENT_TYPES: any = {
  array: (propertyKey: string, property: any) => {
    return `${property.items[REF_KEY] || property.items.type}[]`;
  },
  boolean: (propertyKey: string, property: any) => {
    return "boolean";
  },
  integer: (propertyKey: string, property: any) => {
    return "number";
  },
  number: (propertyKey: string, property: any) => {
    return "number";
  },
  object: (propertyKey: string, property: any) => {
    return property[REF_KEY] || property.type;
  },
  string: (propertyKey: string, property: any) => {
    return "string";
  },
  null: (propertyKey: string, property: any) => {
    return "any";
  },
};

const toTypingStringInternal = (definitions: any) => {
  console.log("definitions", definitions);
  var body = [] as string[];
  Object.keys(definitions).forEach((key) => {
    var line = [] as string[];
    var definition = definitions[key];

    Object.keys(definition.properties || {}).forEach((propertyKey) => {
      var property = definition.properties[propertyKey];
      if (property.type in COMPONENT_TYPES) {
        line.push(
          `${propertyKey}?: ${COMPONENT_TYPES[property.type](
            propertyKey,
            property
          )};`
        );
      } else {
        line.push(`${propertyKey}: Unsupported;`);
      }
    });

    body.push(
      `export type ${key} = {
          ${line.join("")}
        }`
    );
  });

  return body.join("\r\n");
};

export default (definitions: any) => {
  return toTypingStringInternal(definitions);
};
