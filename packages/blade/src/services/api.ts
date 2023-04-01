import { CreateHttpOptions } from "@q25a25q/common";
import { creatAuth, WebsiteConfig } from "..";
import { createApiHttp } from "../http";
import { userService } from "./user";
import type { UserService } from "./user";

export type ServiceTypes = {
  user: UserService;
};

export const createWebApi = <T>(
  websiteConfig: WebsiteConfig,
  options?: CreateHttpOptions
) => {
  var services = {};
  var auth = creatAuth(websiteConfig);
  var httpClient = createApiHttp(auth, options);
  var params = {
    auth: auth,
    httpClient: httpClient,
    websiteConfig: websiteConfig,
  };
  const withInstall = (name: string, func: any) => {
    services[name] = func(params);
  };

  const installDefault = () => {
    withInstall("user", userService);
  };
  installDefault();

  return {
    auth,
    // httpClient,
    services: services as T & ServiceTypes,
    withInstall,
  };
};
