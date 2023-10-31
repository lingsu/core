import { BladeRequest, BladeConfig, Dict } from "../../typing";


export type DictParams = {
  code?: string;
  dictKey?: string;
  dictValue?: string;
  id?: number;
  parentId?: number;
};
export type DictService = {
  getList: (params?: DictParams) => Promise<Dict[]>;
  getDictionary: (params?: DictParams) => Promise<Dict[]>;
  getDictionaryTree: (params?: DictParams) => Promise<Dict[]>;
};
export function dictService(request: BladeRequest, config: BladeConfig): DictService {
  const getList = (params: any) => {
    return request.get<Dict[]>("/blade-system/dict/list", {
      params: {
        ...params,
      },
    });
  };

  //  const getParentList = (params) => {
  //   return request({
  //     url: '/blade-system/dict/parent-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //     },
  //   });
  // };
  //  const getChildList = (params) => {
  //   return request({
  //     url: '/blade-system/dict/child-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //     },
  //   });
  // };
  //  const remove = (ids) => {
  //   return request({
  //     url: '/blade-system/dict/remove',
  //     method: 'post',
  //     params: {
  //       ids,
  //     },
  //   });
  // };
  //  const add = (row) => {
  //   return request({
  //     url: '/blade-system/dict/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };
  //  const update = (row) => {
  //   return request({
  //     url: '/blade-system/dict/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };
  //  const getDict = (id) => {
  //   return request({
  //     url: '/blade-system/dict/detail',
  //     method: 'get',
  //     params: {
  //       id,
  //     },
  //   });
  // };
  //  const getDictTree = () => {
  //   return request({
  //     url: '/blade-system/dict/tree?code=DICT',
  //     method: 'get',
  //   });
  // };
  //  const getTree = async (code: string) => {
  //   var res = await request({
  //     url: '/blade-system/dict/dictionary-tree?code=' + code,
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
  const getDictionary = (params?: DictParams) => {
    return request.get<Dict[]>("/blade-system/dict/dictionary", {
      params,
    });
  };
   const getDictionaryTree = (params?: DictParams) => {
    return request.get<Dict[]>("/blade-system/dict/dictionary-tree", {
      params,
    });
    // return request({
    //   url: '//blade-system/dict-biz/dictionary-tree',
    //   method: 'get',
    //   params,
    // });
  };
  //  const getDictionaryByCode = async (code: string) => {
  //   var data = await getDictionary({ code: code });
  //   return data.map((x) => ({
  //     ...x,
  //     value: x.dictKey,
  //     title: x.dictValue,
  //     label: x.dictValue,
  //   }));
  // };
  return {
    getList,
    getDictionary,
    getDictionaryTree,
    // getParentList,
    // getChildList,
    // remove,
    // add,
  };
}
