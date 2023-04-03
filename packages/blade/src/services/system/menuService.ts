import { ServiceParams } from "../api";

export type Menu = {
  action: number;
  actionName: string;
  alias: string;
  category: number;
  categoryName: string;
  children: Menu[];
  code: string;
  hasChildren: true;
  id: number;
  isDeleted: number;
  isOpen: number;
  isOpenName: string;
  name: string;
  parentId: number;
  parentName: string;
  path: string;
  remark: string;
  sort: number;
  source: string;
};
export type MenuService = {
  getRoutes: (topMenuId?: string) => Promise<Menu[]>;
};

export const menuService = ({ httpClient }: ServiceParams): MenuService => {
  //  const getList = (current, size, params) => {
  //   return request({
  //     url: '/api/blade-system/menu/list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //       current,
  //       size,
  //     },
  //   });
  // };

  //  const getLazyList = (parentId, params) => {
  //   return request({
  //     url: '/api/blade-system/menu/lazy-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //       parentId,
  //     },
  //   });
  // };

  //  const getLazyMenuList = (parentId, params) => {
  //   return request({
  //     url: '/api/blade-system/menu/lazy-menu-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //       parentId,
  //     },
  //   });
  // };

  //  const getMenuList = (current, size, params) => {
  //   return request({
  //     url: '/api/blade-system/menu/menu-list',
  //     method: 'get',
  //     params: {
  //       ...params,
  //       current,
  //       size,
  //     },
  //   });
  // };

  //  const getMenuTree = (tenantId) => {
  //   return request({
  //     url: '/api/blade-system/menu/tree',
  //     method: 'get',
  //     params: {
  //       tenantId,
  //     },
  //   });
  // };

  //  const remove = (ids) => {
  //   return request({
  //     url: '/api/blade-system/menu/remove',
  //     method: 'post',
  //     params: {
  //       ids,
  //     },
  //   });
  // };

  //  const add = (row) => {
  //   return request({
  //     url: '/api/blade-system/menu/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };

  //  const update = (row) => {
  //   return request({
  //     url: '/api/blade-system/menu/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };

  //  const getMenu = (id) => {
  //   return request({
  //     url: '/api/blade-system/menu/detail',
  //     method: 'get',
  //     params: {
  //       id,
  //     },
  //   });
  // };

  //  const getTopMenu = () =>
  //   request({
  //     url: '/api/blade-system/menu/top-menu',
  //     method: 'get',
  //   });

  const getRoutes = (topMenuId?: string) =>
    httpClient.get<Menu[]>("/api/blade-system/menu/routes", {
      params: {
        topMenuId: topMenuId,
      },
    });

  return {
    getRoutes,
    // getMenuList,
    // getMenuTree,
    // getLazyMenuList,
    // getLazyList,
  };
};
