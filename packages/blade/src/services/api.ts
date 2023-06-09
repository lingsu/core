import { CreateHttpOptions, HttpClient } from "@q25a25q/common";
import { creatAuth } from "..";
import { createApiHttp } from "../http";
import { oauthService } from "./oauthService";
import type { OauthService } from "./oauthService";
import { bladeUserService, BladeUserService } from "./system/bladeUserService";
import { dictService, DictService } from "./system/dictService";
import { menuService, MenuService } from "./system/menuService";
import { RegionService, regionService } from "./system/regionService";
import type { Auth, WebApiService, WebsiteConfig } from "../typing";
import { FileService, fileService } from "./fileService";
import defaultConfig from "./defaultConfig";
export type ServiceTypes = {
  oauth: OauthService;
  bladeUser: BladeUserService;
  dict: DictService;
  menu: MenuService;
  region: RegionService;
  file: FileService;
};

export type ServiceParams = {
  auth: Auth;
  httpClient: HttpClient;
  websiteConfig: WebsiteConfig;
};
export function createDefaultWebApi<T>(websiteConfig?: WebsiteConfig, options?: CreateHttpOptions): WebApiService<T> {
  var services = {};
  websiteConfig = { ...defaultConfig, ...websiteConfig };
  var auth = creatAuth(websiteConfig);
  var httpClient = createApiHttp(auth, options);
  var params: ServiceParams = {
    auth: auth,
    httpClient: httpClient,
    websiteConfig: websiteConfig,
  };
  const withInstall = (name: string, func: (params: ServiceParams) => any) => {
    if (services[name]) {
      console.log(`${name} 服务重复安装`);
    }
    services[name] = func(params);
  };

  const installDefault = () => {
    withInstall("oauth", oauthService);
    withInstall("bladeUser", bladeUserService);
    withInstall("dict", dictService);
    withInstall("menu", menuService);
    withInstall("region", regionService);
    withInstall("file", fileService);
  };
  installDefault();

  return {
    auth,
    httpClient,
    services: services as T & ServiceTypes,
    withInstall,
  };
}

// let defaultWebApi = createDefaultWebApi<any>();

// export const replaceDefaultWebApi = <T>(newWebApi: WebApiService<T>) => {
//   defaultWebApi = newWebApi;
// };
// export const withInstall = (name: string, func: (params: ServiceParams) => any) => {
//   defaultWebApi.withInstall(name, func);
// }
// export default <T = ServiceTypes>() => {
//   return defaultWebApi as WebApiService<T>;
// };
