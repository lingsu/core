import dayjs from 'dayjs';

export default (value: any) => {
  var result = {...value};
  
  Object.keys(result).forEach((key: string) => {
    if (result[key] && result[key] instanceof Date){
      result[key] = dayjs(result[key]).format('YYYY-MM-DD HH:mm:ss');
    }else if (result[key] && Array.isArray(result[key])){
      if (result[key].length > 0) {
          if (typeof result[key][0] === 'string') {
            result[key] = result[key].join(',')
          }
      }
    }
  })
  return result;
};
