import guessType from "./guessType";

type Field = {
  type: string;
  format?: string;
  items?: Field;
  properties?: Field;
};

type Schema = {
  [name: string]: Field;
};

type Config = {
  clearEmpty?: boolean;
  schema?: Schema;
  mode?: "edit" | "submit";
  registry?: { [name: string]: (value: any, field: Field) => any };
};

const EDIT_COMPONENT_STRING_FORMAT = {
  date: (value: string) => {
    if (value) {
      return value.split(" ")[0];
    }
    return value;
  },
};
const SUBMIT_COMPONENT_STRING_FORMAT = {
  date: (value: string) => {
    if (value) {
      return value + " 00:00:00";
    }

    return value;
  },
};

const EDIT_COMPONENT_TYPES: any = {
  array: (value: any, field: Field) => {
    var type = guessType(value);
    if ("string" === type) {
      var itemType = field.items!.type;

      if (itemType === "string") {
        return value.split(",");
      }
      if (itemType === "number") {
        return value.split(",").map(Number);
      }
      throw new Error("Invalid type");
    }
    return value;
  },
  string: (value: any, field: Field) => {
    if (field.format) {
      if (field.format in EDIT_COMPONENT_STRING_FORMAT) {
        return EDIT_COMPONENT_STRING_FORMAT[field.format](value);
      } else {
        console.log(`不支持字符串格式'${field.format}'`);
      }
    }
    return value;
  },
};
const SUBMIT_COMPONENT_TYPES: any = {
  array: (value: any, field: Field) => {
    var type = guessType(value);
    if ("array" === type) {
      return value.join(",");
    }
    return value;
  },
  string: (value: any, field: Field) => {
    if (field.format) {
      if (field.format in SUBMIT_COMPONENT_STRING_FORMAT) {
        return SUBMIT_COMPONENT_STRING_FORMAT[field.format](value);
      } else {
        console.log(`不支持字符串格式'${field.format}'`);
      }
    }
    return value;
  },
};

export default <T = any>(data: T, config: Config) => {
  config = {
    clearEmpty: true,
    mode: "edit",
    ...config,
  };
  var value: any = { ...data };

  if (config.clearEmpty) {
    Object.keys(value).forEach((key) => {
      if (value[key] == "") {
        value[key] = null;
      }
    });
  }

  if (!config.registry) {
    config.registry =
      config.mode === "edit" ? EDIT_COMPONENT_TYPES : SUBMIT_COMPONENT_TYPES;
  }

  if (config.schema) {
    Object.keys(config.schema).forEach((pKey) => {
      var schema = config.schema![pKey];
      if (schema.type in config.registry!) {
        value[pKey] = config.registry![schema.type](value[pKey], schema);
      } else {
        console.log(`不支持schema类型'${schema.type}'`);
      }
    });
  }

  return value as T;
};
