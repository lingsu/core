import fields from "./fields";
import templates from "./templates";
import { Registry } from "./typing";

export default (): Registry => {
  return {
    fields: fields(),
    templates: templates(),
    definitions: {},
    rootSchema: {},
  };
};
