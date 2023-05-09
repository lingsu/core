import dayjs from "dayjs";
export const intOrStringArrayToStringConvert = (value: any[], field?: any) => {
  if (value && value.length > 0) {
    if (typeof value[0] === "number" || typeof value[0] === "string") {
      return value.join(",");
    }
  }
  return null;
};

export type Options = {
  label: string;
  value: string | number;
  children: Options[] | null;
};
export type OptionsConvertOption = {
  valueKey?: string;
  labelKey?: string;
  isNumber?: boolean;
}
export const optionsConvert = (
  items: any,
  options?: OptionsConvertOption
): Options[] | null => {
  if (items) {
    const defaultOptions = {
      valueKey: "id",
      labelKey: "name",
      isNumber: true,
      ...options,
    };
    return items.map((item: Record<string, any>) => ({
      value: defaultOptions.isNumber
        ? Number(item[defaultOptions.valueKey])
        : item[defaultOptions.valueKey],
      label: item[defaultOptions.labelKey],
      data: item,
      children: optionsConvert(item.children, options),
    }));
  }
  return null;
};

export const stringToIntArrayConvert = (value: string, field?: any) => {
  if (value) {
    return value.split(",").map((x) => Number(x));
  }
  return null;
};

export const stringToDateTimeConvert = (value: any, field?: any) => {
  // console.log('aa', value, field);
  if (value) {
    // return dayjs(value, 'YYYY-MM-DD').toDate();
    return dayjs(value).toDate();
  }
  return null;
};
