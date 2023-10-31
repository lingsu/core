import { AntdPage, BladeConfig, BladeRequest, Region } from "../../typing";


export type RegionService = {
  getList: (params: any) => Promise<AntdPage<Region>>;
  getSelectList: (code?: any) => Promise<Region[]>;
  getRegionLazyTree: (parentCode?: any) => Promise<Region[]>;
};
export const regionService = (request: BladeRequest, config: BladeConfig): RegionService => {
  const getList = (params: any) => {
    return request.getPage<Region>("/blade-system/region/list", {
      params: {
        ...params,
      },
    });
  };
  const getSelectList = (code?: any) => {
    return request.get<Region[]>("/blade-system/region/select", {
      params: {
        code,
      },
    });
  };

  const getRegionLazyTree = (parentCode?: any) => {
    return request.get<Region[]>("/blade-system/region/lazy-tree", {
      params: {
        parentCode,
      },
    });
  };
  // const getParentList = (params) => {
  //   return request({
  //     url: '/blade-system/dict/parent-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //     },
  //   });
  // };

  // const getChildList = (params) => {
  //   return request({
  //     url: '/blade-system/dict/child-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //     },
  //   });
  // };

  // const remove = (ids) => {
  //   return request({
  //     url: '/blade-system/dict/remove',
  //     method: 'post',
  //     params: {
  //       ids,
  //     },
  //   });
  // };

  // const add = (row) => {
  //   return request({
  //     url: '/blade-system/dict/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };

  // const update = (row) => {
  //   return request({
  //     url: '/blade-system/dict/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };

  // const getDict = (id) => {
  //   return request({
  //     url: '/blade-system/dict/detail',
  //     method: 'get',
  //     params: {
  //       id,
  //     },
  //   });
  // };
  // const getDictTree = () => {
  //   return request({
  //     url: '/blade-system/dict/tree?code=DICT',
  //     method: 'get',
  //   });
  // };

  // const getTree = async (code: string) => {
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

  // const getDictionary = (params) => {
  //   return request({
  //     url: '/blade-system/dict/dictionary',
  //     method: 'get',
  //     params,
  //   });
  // };
  // const getDictionaryTree = (params) => {
  //   return request({
  //     url: '//blade-system/dict-biz/dictionary-tree',
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
