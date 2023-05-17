export type Options = {
  label: string;
  value: string | number;
  children: Options[] | null;
};
export type OptionsConvertOption = {
  valueKey?: string;
  labelKey?: string;
  isNumber?: boolean;
};

const optionsConvert = (
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

  export default optionsConvert;