export default (value: any[], field?: any) => {
    if (value && value.length > 0) {
      if (typeof value[0] === "number" || typeof value[0] === "string") {
        return value.join(",");
      }
    }
    return null;
  };