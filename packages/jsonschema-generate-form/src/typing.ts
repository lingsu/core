import { JSONSchema7 } from "json-schema";
import { ComponentType, ReactElement } from "react";

export type StrictSchema = JSONSchema7;
export type GenericObjectType = {
  [name: string]: any;
};
export type Schema = StrictSchema & GenericObjectType;
export type UiSchema = {};
export type FieldPath = {
  $name: string;
};
export type PathSchema<T = any> = FieldPath & {
  [key in keyof T]?: PathSchema<T[key]>;
};
export type FieldProps = {
  name: string;
  schema: Schema;
  registry: Registry;
};
export type Field = ComponentType<FieldProps>;
export type RegistryFieldsType = {
  [name: string]: Field;
};
export type Registry = {
  fields: RegistryFieldsType;
  templates: TemplatesType;
};

export type FieldTemplateProps = {
  id: string;
  children: ReactElement;
};

export type ObjectFieldTemplatePropertyType = {
    /** The html for the property's content */
    content: ReactElement;
    /** A string representing the property name */
    name: string;
    /** A boolean value stating if the object property is disabled */
    disabled: boolean;
    /** A boolean value stating if the property is read-only */
    readonly: boolean;
    /** A boolean value stating if the property should be hidden */
    hidden: boolean;
}
export type ObjectFieldTemplateProps = {
  properties:ObjectFieldTemplatePropertyType[];
  schema: Schema;
  registry: Registry;
};
export type TemplatesType = {
  FieldTemplate: ComponentType<FieldTemplateProps>;
  ObjectFieldTemplate: ComponentType<ObjectFieldTemplateProps>;
};
