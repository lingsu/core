import { ID_KEY, REF_KEY } from "../../constants";
import { IdSchema } from "../../typing";
import guessType from "../guessType";
import isObject from "../isObject";
import mergeObjects from "../mergeObjects";
import schemaUtils from "../schemaUtils";

const COMPONENT_TYPES: any = {
  array: (
    schema: any,
    idSeparator: string,
    idSchema: IdSchema,
    definitions: any,
    id?: string | null,
    rootSchema?: any
  ) => {
    var fieldType = guessType(schema[0]);

    if (fieldType === "object") {
      const _idSchema = mergeObjects(
        schemaUtils().toIdSchema(schema[0], id, schema, idSeparator),
        idSchema
      ) as IdSchema;

      toDefinitionsInternal(
        schema[0],
        idSeparator,
        _idSchema,
        definitions,
        id,
        rootSchema
      );
    }

    return fieldType === "object"
      ? {
          type: "array",
          // [REF_KEY]: id,
          // format: "int64",
          description: "",
          items: {
            [REF_KEY]: id,
          },
        }
      : {
          type: "array",
          // [REF_KEY]: id,
          // format: "int64",
          description: "",
          items: {
            type: fieldType,
          },
        };
  },
  boolean: (
    schema: any,
    idSeparator: string,
    idSchema: IdSchema,
    definitions: any,
    id?: string | null,
    rootSchema?: any
  ) => {
    return {
      type: "boolean",
      // format: "int64",
      description: "",
    };
  },
  integer: (
    schema: any,
    idSeparator: string,
    idSchema: IdSchema,
    definitions: any,
    id?: string | null,
    rootSchema?: any
  ) => {
    return {
      type: "integer",
      [REF_KEY]: id,
      format: "int64",
      description: "",
    };
  },
  number: (
    schema: any,
    idSeparator: string,
    idSchema: IdSchema,
    definitions: any,
    id?: string | null,
    rootSchema?: any
  ) => {
    return {
      type: "integer",
      format: "int64",
      description: "",
    };
  },
  object: (
    schema: any,
    idSeparator: string,
    idSchema: IdSchema,
    definitions: any,
    id?: string | null,
    rootSchema?: any
  ) => {
    return {
      type: "object",
      [REF_KEY]: id,
      // format: "int64",
      description: "",
    };
  },
  string: (
    schema: any,
    idSeparator: string,
    idSchema: IdSchema,
    definitions: any,
    id?: string | null,
    rootSchema?: any
  ) => {
    return {
      type: "string",
      // format: "int64",
      description: "",
    };
  },
  null: (
    schema: any,
    idSeparator: string,
    idSchema: IdSchema,
    definitions: any,
    id?: string | null,
    rootSchema?: any
  ) => {
    return {
      type: "string",
      // format: "int64",
      description: "",
    };
  },
};

const toDefinitionsInternal = (
  schema: any,
  idSeparator: string,
  idSchema: IdSchema,
  definitions: any,
  id?: string | null,
  rootSchema?: any
) => {
  var type = guessType(schema);

  // console.log("toDefinitionsInternal", idSchema);
  if (type === "object") {
    definitions[id!] = Object.keys(schema).reduce(
      (acc, key) => {
        const field = schema[key];
        var fieldType = guessType(field);
        const fieldIdSchema = idSchema[key]!;
        const fieldId = fieldIdSchema[ID_KEY];

        // console.log("fieldIdSchema", fieldIdSchema);

        if (isObject(field)) {
          toDefinitionsInternal(
            field,
            idSeparator,
            fieldIdSchema,
            definitions,
            fieldId,
            rootSchema
          );

          //   acc.properties[key] = {
          //     type: "object",
          //     ref: fieldId,
          //     // format: "int64",
          //     description: "",
          //   };
        }
        if (fieldType in COMPONENT_TYPES) {
          acc.properties[key] = COMPONENT_TYPES[fieldType](
            field,
            idSeparator,
            fieldIdSchema,
            definitions,
            fieldId,
            rootSchema

            // fieldType,
          );
        }

        return acc;
      },
      {
        type: "object",
        properties: {},
      }
    );
  }
  return definitions;
};

export default (
  schema: any,
  idSchema: IdSchema,
  id?: string | null,
  rootSchema?: any,
  idSeparator = "_",
  definitions = {}
) => {
  return toDefinitionsInternal(
    schema,
    idSeparator,
    idSchema,
    definitions,
    id,
    rootSchema
  );
};
