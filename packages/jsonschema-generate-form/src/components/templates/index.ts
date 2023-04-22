import { TemplatesType } from "../../typing";
import FieldTemplate from "./FieldTemplate";
import ObjectFieldTemplate from "./ObjectFieldTemplate";

export default (): TemplatesType => {
  return {
    FieldTemplate,
    ObjectFieldTemplate,
  };
};
