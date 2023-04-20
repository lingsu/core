import fields from "./components/fields";
import templates from "./components/templates";
import { Registry } from "./typing";

export default (): Registry => {
  return {
    fields: fields(),
    templates: templates(),
  };
};
