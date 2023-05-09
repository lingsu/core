export default (value: string, field?: any) => {
    if (value) {
      return value.split(",").map((x) => Number(x));
    }
    return null;
  };