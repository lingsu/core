import { ServiceParams } from "../api";
export type BladeUser = {
  id: string;
  createUser: string;
  createDept: string;
  createTime: string;
  updateUser: string;
  updateTime: string;
  status: number;
  isDeleted: number;
  tenantId: string;
  code: string;
  userType: number;
  account: string;
  name: string;
  realName: string;
  avatar: string;
  email: string;
  phone: string;
  birthday: string;
  sex: number;
  roleId: string;
  deptId: string;
  postId: string;
  areaCode: string;
  companyNumber: string;
  companyName: string;
  tenantName: string;
  userTypeName: string;
  roleName: string;
  deptName: string;
  postName: string;
  sexName: string;
  userExt: string;
};

export type BladeUserService = {
  getUserInfo: () => Promise<BladeUser>;
  // getList,
  // remove,
  // add,
  // update,
  // updatePlatform,
  // getUser,
  // getUserPlatform,
  updatePassword: (
    oldPassword: string,
    newPassword: string,
    newPassword1: string
  ) => Promise<any>;
  updateInfo: (bladeUser: BladeUser) => Promise<any>;
};

export const bladeUserService = ({ httpClient }: ServiceParams) => {
  // export const getList = (current, size, params, deptId) => {
  //   return request({
  //     url: '/api/blade-user/page',
  //     method: 'get',
  //     params: {
  //       ...params,
  //       current,
  //       size,
  //       deptId,
  //     },
  //   });
  // };
  // export const remove = (ids) => {
  //   return request({
  //     url: '/api/blade-user/remove',
  //     method: 'post',
  //     params: {
  //       ids,
  //     },
  //   });
  // };
  // export const add = (row) => {
  //   return request({
  //     url: '/api/blade-user/submit',
  //     method: 'post',
  //     data: row,
  //   });
  // };
  // export const update = (row) => {
  //   return request({
  //     url: '/api/blade-user/update',
  //     method: 'post',
  //     data: row,
  //   });
  // };
  // export const updatePlatform = (userId, userType, userExt) => {
  //   return request({
  //     url: '/api/blade-user/update-platform',
  //     method: 'post',
  //     params: {
  //       userId,
  //       userType,
  //       userExt,
  //     },
  //   });
  // };
  // export const getUser = (id) => {
  //   return request({
  //     url: '/api/blade-user/detail',
  //     method: 'get',
  //     params: {
  //       id,
  //     },
  //   });
  // };
  // export const getUserPlatform = (id) => {
  //   return request({
  //     url: '/api/blade-user/platform-detail',
  //     method: 'get',
  //     params: {
  //       id,
  //     },
  //   });
  // };
  const getUserInfo = () => {
    return httpClient.get<BladeUser>("/api/blade-user/info");
  };

  // export const resetPassword = (userIds) => {
  //   return request({
  //     url: '/api/blade-user/reset-password',
  //     method: 'post',
  //     params: {
  //       userIds,
  //     },
  //   });
  // };
  const updatePassword = (
    oldPassword: string,
    newPassword: string,
    newPassword1: string
  ) => {
    return httpClient.post("/api/blade-user/update-password", {
      params: {
        oldPassword,
        newPassword,
        newPassword1,
      },
    });
  };
  const updateInfo = (bladeUser: BladeUser) => {
    return httpClient.post("/api/blade-user/update-info", {
      data: bladeUser,
    });
  };
  // export const grant = (userIds, roleIds) => {
  //   return request({
  //     url: '/api/blade-user/grant',
  //     method: 'post',
  //     params: {
  //       userIds,
  //       roleIds,
  //     },
  //   });
  // };
  // export const unlock = (userIds) => {
  //   return request({
  //     url: '/api/blade-user/unlock',
  //     method: 'post',
  //     params: {
  //       userIds,
  //     },
  //   });
  // };
  // export const retrieveCode = (account: string, type: number, key: string, code: string) => {
  //   return request({
  //     url: '/api/blade-auth/user/retrieve-code',
  //     method: 'post',
  //     headers: {
  //       'Captcha-Key': key,
  //       'Captcha-Code': code,
  //     },
  //     params: {
  //       account,
  //       type,
  //       tenantId: website.tenantId,
  //     },
  //   });
  // };
  // export const retrievePassword = (account, password, verCode) => {
  //   return request({
  //     url: '/api/blade-auth/user/retrieve-password',
  //     method: 'post',
  //     params: {
  //       account,
  //       password,
  //       verCode,
  //       tenantId: website.tenantId,
  //     },
  //   });
  // };
  return {
    getUserInfo,
    // getList,
    // remove,
    // add,
    // update,
    // updatePlatform,
    // getUser,
    // getUserPlatform,
    updatePassword,
    updateInfo,
    // grant,
    // unlock,
    // retrieveCode,
    // retrievePassword
    // resetPassword
  };
};
