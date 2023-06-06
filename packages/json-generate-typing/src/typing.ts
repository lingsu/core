export type FieldProps = {
  name: string;
  schema: any;
  registry: Registry;
  idSchema: IdSchema;
};

export type Field = (props: FieldProps) => string;

export type RegistryFieldsType = {
  [name: string]: Field;
};
export type TemplatesType = {
  FieldTemplate: any;
  ObjectFieldTemplate: any;
};

export type SchemaUtilsType = {
  toIdSchema(schema: any, id?: string, formData?: any): IdSchema;
}

export type Registry = {
  fields: RegistryFieldsType;
  templates: TemplatesType;
  definitions: any;
  rootSchema: any;
  schemaUtils: SchemaUtilsType
};

/** Type describing an id used for a field in the `IdSchema` */
export type FieldId = {
  /** The id for a field */
  $id: string;
};

/** Type describing a recursive structure of `FieldId`s for an object with a non-empty set of keys */
export type IdSchema<T = any> = FieldId & {
  /** The set of ids for fields in the recursive object structure */
  [key in keyof T]?: IdSchema<T[key]>;
};
export type GenericObjectType = {
  [name: string]: any;
};