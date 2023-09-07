import { PageWarp } from "../../typing";
import { ServiceParams } from "../api";

export type Region = {
  /**
   * undefined
   */
  children: Region[];
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
export type RegionService = {
  getList: (params: any) => Promise<PageWarp<Region>>;
  getSelectList: (code?: any) => Promise<Region[]>;
  getRegionLazyTree: (parentCode?: any) => Promise<Region[]>;
};
export const regionService = ({ httpClient }: ServiceParams): RegionService => {
  const getList = (params: any) => {
    return httpClient.get<PageWarp<Region>>("/api/blade-system/region/list", {
      params: {
        ...params,
      },
    });
  };
  const getSelectList = (code?: any) => {
    return httpClient.get<Region[]>("/api/blade-system/region/select", {
      params: {
        code,
      },
    });
  };

  const getRegionLazyTree = (parentCode?: any) => {
    return httpClient.get<Region[]>("https://hatching.ouhaihr.com/api/blade-system/region/lazy-tree", {
      params: {
        parentCode,
      },
    });
  };
  // const getParentList = (params) => {
  //   return request({
  //     url: '/api/blade-system/dict/parent-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //     },
  //   });
  // };

  // const getChildList = (params) => {
  //   return request({
  //     url: '/api/blade-system/dict/child-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //     },
  //   });
  // };

  // const remove = (ids) => {
  //   return request({
  //     url: '/api/blade-system/dict/remove',
  //     method: 'post',
  //     params: {
  //       ids,
  //     },
  //   });
  // };

  // const add = (row) => {
  //   return request({
  //     url: '/api/blade-system/dict/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };

  // const update = (row) => {
  //   return request({
  //     url: '/api/blade-system/dict/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };

  // const getDict = (id) => {
  //   return request({
  //     url: '/api/blade-system/dict/detail',
  //     method: 'get',
  //     params: {
  //       id,
  //     },
  //   });
  // };
  // const getDictTree = () => {
  //   return request({
  //     url: '/api/blade-system/dict/tree?code=DICT',
  //     method: 'get',
  //   });
  // };

  // const getTree = async (code: string) => {
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

  // const getDictionary = (params) => {
  //   return request({
  //     url: '/api/blade-system/dict/dictionary',
  //     method: 'get',
  //     params,
  //   });
  // };
  // const getDictionaryTree = (params) => {
  //   return request({
  //     url: '/api//blade-system/dict-biz/dictionary-tree',
  //     method: 'get',
  //     params,
  //   });
  // };

  // const getDictionaryByCode = async (code: string) => {
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
    getSelectList,
    // getParentList,
    // getChildList,
    // remove,
    getRegionLazyTree
  };
};
