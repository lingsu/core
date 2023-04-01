import defHttp from '@/andy/utils/axios';

export type Dict = {
  /**
   * undefined
   */
  children: Dict[];
  /**
   * 字典码
   */
  code: string;
  /**
   * 字典值
   */
  dictKey: string;
  /**
   * 字典名称
   */
  dictValue: string;
  /**
   * undefined
   */
  hasChildren: boolean;
  /**
   * undefined
   */
  id: number;
  /**
   * 是否已删除
   */
  isDeleted: number;
  /**
   * 是否已封存
   */
  isSealed: number;
  /**
   * undefined
   */
  parentId: number;
  /**
   * undefined
   */
  parentName: string;
  /**
   * 字典备注
   */
  remark: string;
  /**
   * 排序
   */
  sort: number;
};

export const getList = (current: any, size: any, params?: any) => {
  return defHttp.get('/api/blade-system/dict/list', {
    params: {
      ...params,
      current,
      size,
    },
  });
};

// export const getParentList = (params) => {
//   return request({
//     url: '/api/blade-system/dict/parent-list',
//     method: 'get',
//     params: {
//       ...params,
//     },
//   });
// };

// export const getChildList = (params) => {
//   return request({
//     url: '/api/blade-system/dict/child-list',
//     method: 'get',
//     params: {
//       ...params,
//     },
//   });
// };

// export const remove = (ids) => {
//   return request({
//     url: '/api/blade-system/dict/remove',
//     method: 'post',
//     params: {
//       ids,
//     },
//   });
// };

// export const add = (row) => {
//   return request({
//     url: '/api/blade-system/dict/submit',
//     method: 'post',
//     data: row,
//   });
// };

// export const update = (row) => {
//   return request({
//     url: '/api/blade-system/dict/submit',
//     method: 'post',
//     data: row,
//   });
// };

// export const getDict = (id) => {
//   return request({
//     url: '/api/blade-system/dict/detail',
//     method: 'get',
//     params: {
//       id,
//     },
//   });
// };
// export const getDictTree = () => {
//   return request({
//     url: '/api/blade-system/dict/tree?code=DICT',
//     method: 'get',
//   });
// };

// export const getTree = async (code: string) => {
//   var res = await request({
//     url: '/api/blade-system/dict/dictionary-tree?code=' + code,
//     method: 'get',
//   });

//   const loop = (data: Dict[]) => {
//     if (data) {
//       return data.map((x) => ({
//         ...x,
//         // key: x.dictKey,
//         value: x.dictKey,
//         title: x.dictValue,
//         children: loop(x.children),
//       }));
//     }
//     return null;
//   };

//   return loop(res);
// };

// export const getDictionary = (params) => {
//   return request({
//     url: '/api/blade-system/dict/dictionary',
//     method: 'get',
//     params,
//   });
// };
// export const getDictionaryTree = (params) => {
//   return request({
//     url: '/api//blade-system/dict-biz/dictionary-tree',
//     method: 'get',
//     params,
//   });
// };

// export const getDictionaryByCode = async (code: string) => {
//   var data = await getDictionary({ code: code });
//   return data.map((x) => ({
//     ...x,
//     value: x.dictKey,
//     title: x.dictValue,
//     label: x.dictValue,
//   }));
// };
