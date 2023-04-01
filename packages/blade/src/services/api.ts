import { CreateHttpOptions } from "@q25a25q/common";
import { creatAuth, WebsiteConfig } from "..";
import { createApiHttp } from "../http";
import { userService } from "./user";

export const createWebApi = (
  websiteConfig: WebsiteConfig,
  options?: CreateHttpOptions
) => {
  var services: Record<string, any> = {};
  var auth = creatAuth(websiteConfig);
  var httpClient = createApiHttp(auth, options);
  var params = {
    auth: auth,
    httpClient: httpClient,
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
    services,
    withInstall,
  };
};
