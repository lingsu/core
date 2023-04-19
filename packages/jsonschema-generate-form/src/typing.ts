import { JSONSchema7 } from 'json-schema';

export type StrictSchema = JSONSchema7;
export type GenericObjectType = {
    [name: string]: any;
  };
export type Schema = StrictSchema & GenericObjectType;
export type UiSchema = {

}
export type FieldPath = {
  $name: string;
};
export type PathSchema<T = any> = FieldPath & {
  [key in keyof T]?: PathSchema<T[key]>;
};

