import dayjs from "dayjs";

export default (result: any, ignoreFields: string[] = []) => {
  return Object.keys(result).reduce((acc, key: string) => {
    if (ignoreFields.includes(key)) {
      acc[key] = result[key];
    }else if (result[key] && result[key] instanceof Date) {
      acc[key] = dayjs(result[key]).format("YYYY-MM-DD HH:mm:ss");
    } else if (result[key] && Array.isArray(result[key])) {
      if (result[key].length > 0) {
        if (typeof result[key][0] === "string") {
          acc[key] = result[key].join(",");
        }
      }
    } else if (
      typeof result[key] === "string" &&
      dayjs(result[key], "YYYY-MM-DD", true).isValid()
    ) {
      acc[key] = result[key] + " 00:00:00";
    } else {
      acc[key] = result[key];
    }
    return acc;
  }, {});
};
