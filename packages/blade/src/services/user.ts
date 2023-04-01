import type { HttpClient } from "@q25a25q/common";
import type { WebsiteConfig } from "..";

export type LoginInfo = {
  tenant_id: string;
  user_id: string;
  dept_id: string;
  post_id: string;
  role_id: string;
  oauth_id: string;
  account: string;
  user_name: string;
  nick_name: string;
  role_name: string;
  avatar: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  license: string;
  detail: { type: string };
  error_description?: string;
};

export type Captcha = {
  image: string;
  key: string;
};

export type UserService = {
  loginByUsername: (
    tenantId: string,
    deptId: string,
    roleId: string,
    username: string,
    password: string,
    type: string,
    key: string,
    code: string
  ) => Promise<LoginInfo>;
  getCaptcha: () => Promise<Captcha>;
};
export const userService = ({
  httpClient,
  websiteConfig,
}: {
  httpClient: HttpClient;
  websiteConfig: WebsiteConfig;
}) => {
  const loginByUsername = (
    tenantId: string,
    deptId: string,
    roleId: string,
    username: string,
    password: string,
    type: string,
    key: string,
    code: string
  ) =>
    httpClient.post<LoginInfo>(
      "/api/blade-auth/oauth/token",
      {
        headers: {
          "Tenant-Id": tenantId,
          "Dept-Id": websiteConfig.switchMode ? deptId : "",
          "Role-Id": websiteConfig.switchMode ? roleId : "",
          "Captcha-Key": key,
          "Captcha-Code": code,
        },

        params: {
          tenantId,
          username,
          password,
          grant_type: websiteConfig.captchaMode ? "captcha" : "password",
          scope: "all",
          type,
        },
      },
      { isTransformResponse: true }
    );

  // export const loginByUsername = (tenantId, deptId, roleId, username, password, type, key, code) =>
  //   request({
  //     url: '/api/blade-auth/oauth/token',
  //     method: 'post',
  //     noWarp: true,
  //     headers: {
  //       'Tenant-Id': tenantId,
  //       'Dept-Id': websiteConfig.switchMode ? deptId : '',
  //       'Role-Id': websiteConfig.switchMode ? roleId : '',
  //       'Captcha-Key': key,
  //       'Captcha-Code': code,
  //     },
  //     params: {
  //       tenantId,
  //       username,
  //       password,
  //       grant_type: websiteConfig.captchaMode ? 'captcha' : 'password',
  //       scope: 'all',
  //       type,
  //     },
  //   });

  // export const loginBySocial = (tenantId, source, code, state) =>
  //   request({
  //     url: '/api/blade-auth/oauth/token',
  //     method: 'post',
  //     headers: {
  //       'Tenant-Id': tenantId,
  //     },
  //     params: {
  //       tenantId,
  //       source,
  //       code,
  //       state,
  //       grant_type: 'social',
  //       scope: 'all',
  //     },
  //   });

  // export const refreshToken = (refresh_token, tenantId, deptId, roleId) =>
  //   request({
  //     url: '/api/blade-auth/oauth/token',
  //     method: 'post',
  //     headers: {
  //       'Tenant-Id': tenantId,
  //       'Dept-Id': website.switchMode ? deptId : '',
  //       'Role-Id': website.switchMode ? roleId : '',
  //     },
  //     params: {
  //       tenantId,
  //       refresh_token,
  //       grant_type: 'refresh_token',
  //       scope: 'all',
  //     },
  //   });

  // export const registerGuest = (form, oauthId) =>
  //   request({
  //     url: '/api/blade-user/register-guest',
  //     method: 'post',
  //     params: {
  //       tenantId: form.tenantId,
  //       name: form.name,
  //       account: form.account,
  //       password: form.password,
  //       oauthId,
  //     },
  //   });

  // export const getButtons = () =>
  //   request({
  //     url: '/api/blade-system/menu/buttons',
  //     method: 'get',
  //   });

  const getCaptcha = () =>
    httpClient.get<Captcha>(
      "/api/blade-auth/oauth/captcha",
      {},
      { isTransformResponse: false }
    );

  // export const getCaptcha = () =>
  //   request({
  //     noWarp: true,
  //     url: '/api/blade-auth/oauth/captcha',
  //     method: 'get',
  //   });

  // export const logout = () =>
  //   request({
  //     url: '/api/blade-auth/oauth/logout',
  //     method: 'get',
  //   });

  // export const getUserInfo = () =>
  //   request({
  //     url: '/api/blade-auth/oauth/user-info',
  //     method: 'get',
  //   });

  // export const sendLogs = (list) =>
  //   request({
  //     url: '/api/blade-auth/oauth/logout',
  //     method: 'post',
  //     data: list,
  //   });

  // export const clearCache = () =>
  //   request({
  //     url: '/api/blade-auth/oauth/clear-cache',
  //     method: 'get',
  //   });

  return {
    loginByUsername,
    getCaptcha,
    // logout,
    // getUserInfo,
    // sendLogs,
  };
};
