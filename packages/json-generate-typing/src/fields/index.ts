import ObjectField from "./ObjectField";
import SchemaField from "./SchemaField";
import StringField from "./StringField";
import NumberField from "./NumberField";
import BooleanField from "./BooleanField";
import ArrayField from "./ArrayField";
import NullField from "./NullField";

export default () => {
  return {
    SchemaField,
    ObjectField,
    StringField,
    NumberField,
    BooleanField,
    ArrayField,
    NullField
  };
};
