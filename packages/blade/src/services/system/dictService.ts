import { PageWarp } from "../../typing";
import { ServiceParams } from "../api";

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
export function dictService({ httpClient }: ServiceParams): DictService {
  const getList = (params: any) => {
    return httpClient.get<Dict[]>("/api/blade-system/dict/list", {
      params: {
        ...params,
      },
    });
  };

  //  const getParentList = (params) => {
  //   return request({
  //     url: '/api/blade-system/dict/parent-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //     },
  //   });
  // };
  //  const getChildList = (params) => {
  //   return request({
  //     url: '/api/blade-system/dict/child-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //     },
  //   });
  // };
  //  const remove = (ids) => {
  //   return request({
  //     url: '/api/blade-system/dict/remove',
  //     method: 'post',
  //     params: {
  //       ids,
  //     },
  //   });
  // };
  //  const add = (row) => {
  //   return request({
  //     url: '/api/blade-system/dict/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };
  //  const update = (row) => {
  //   return request({
  //     url: '/api/blade-system/dict/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };
  //  const getDict = (id) => {
  //   return request({
  //     url: '/api/blade-system/dict/detail',
  //     method: 'get',
  //     params: {
  //       id,
  //     },
  //   });
  // };
  //  const getDictTree = () => {
  //   return request({
  //     url: '/api/blade-system/dict/tree?code=DICT',
  //     method: 'get',
  //   });
  // };
  //  const getTree = async (code: string) => {
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
  const getDictionary = (params?: DictParams) => {
    return httpClient.get<Dict[]>("/api/blade-system/dict/dictionary", {
      params,
    });
  };
   const getDictionaryTree = (params?: DictParams) => {
    return httpClient.get<Dict[]>("/api/blade-system/dict/dictionary-tree", {
      params,
    });
    // return request({
    //   url: '/api//blade-system/dict-biz/dictionary-tree',
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
