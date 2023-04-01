import { CreateHttpOptions, HttpClient } from "@q25a25q/common";
import { creatAuth, WebsiteConfig } from "..";
import { createApiHttp } from "../http";
import { oauthService } from "./oauthService";
import type { OauthService } from "./oauthService";
import { Auth } from "../auth";
import { bladeUserService, BladeUserService } from "./system/bladeUserService";
import { dictService, DictService } from "./system/dictService";

export type ServiceTypes = {
  oauth: OauthService;
  bladeUser: BladeUserService;
  dict: DictService;
};

export type ServiceParams = {
  auth: Auth;
  httpClient: HttpClient;
  websiteConfig: WebsiteConfig;
};
export const createWebApi = <T>(
  websiteConfig: WebsiteConfig,
  options?: CreateHttpOptions
) => {
  var services = {};
  var auth = creatAuth(websiteConfig);
  var httpClient = createApiHttp(auth, options);
  var params: ServiceParams = {
    auth: auth,
    httpClient: httpClient,
    websiteConfig: websiteConfig,
  };
  const withInstall = (name: string, func: any) => {
    if (services[name]) {
      console.log(`${name} 服务重复安装`);
    }
    services[name] = func(params);
  };

  const installDefault = () => {
    withInstall("oauth", oauthService);
    withInstall("bladeUser", bladeUserService);
    withInstall("dict", dictService);
  };
  installDefault();

  return {
    auth,
    // httpClient,
    services: services as T & ServiceTypes,
    withInstall,
  };
};
