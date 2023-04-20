import { Schema } from "../typing";
import guessType from "./guessType";

export default (schema: Schema) => {
  let { type } = schema;

  if (!type && schema.const) {
    return guessType(schema.const);
  }

  if (!type && schema.enum) {
    return "string";
  }

  if (!type && (schema.properties || schema.additionalProperties)) {
    return "object";
  }

  if (Array.isArray(type) && type.length === 2 && type.includes("null")) {
    type = type.find((type) => type !== "null");
  }

  return type;
};
