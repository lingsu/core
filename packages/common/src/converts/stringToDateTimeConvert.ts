import dayjs from "dayjs";

export default (value: any, field?: any) => {
  // console.log('aa', value, field);
  if (value) {
    // return dayjs(value, 'YYYY-MM-DD').toDate();
    return dayjs(value).toDate();
  }
  return null;
};
