import dayjs from "dayjs";
export const intOrStringArrayToStringConver = (value: any[], field?: any) => {
  if (value && value.length > 0) {
    if (typeof value[0] === "number" || typeof value[0] === "string") {
      return value.join(",");
    }
  }
  return null;
};

export const optionConver = (
  data: any,
  options?: {
    valueKey?: string;
    labelKey?: string;
    isNumber?: boolean;
  }
) => {
  const defaultOptions = {
    valueKey: "id",
    labelKey: "name",
    isNumber: true,
    ...options,
  };
  if (data) {
    var value = defaultOptions.isNumber
      ? Number(data[defaultOptions.valueKey])
      : data[defaultOptions.valueKey];

    return {
      value: value,
      label: data[defaultOptions.labelKey],
      data: data,
    };
  }
  return null;
};

export const stringToIntArrayConver = (value: string, field?: any) => {
  if (value) {
    return value.split(",").map((x) => Number(x));
  }
  return null;
};

export const stringToDateTimeConver = (value: any, field?: any) => {
  // console.log('aa', value, field);
  if (value) {
    // return dayjs(value, 'YYYY-MM-DD').toDate();
    return dayjs(value).toDate();
  }
  return null;
};
