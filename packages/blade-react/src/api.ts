import { createDefaultWebApi } from "@q25a25q/blade";
import { message } from "antd";
import { WebsiteConfig, WebApiService, ServiceParams, ServiceTypes } from "packages/blade/src/typing";

const createApi = (websiteConfig?: WebsiteConfig, option?: any) => {
  var api = createDefaultWebApi<any>(websiteConfig, {
    ...option,
    transform: {
      requestCatchHook: async (error: any) => {
        // console.log('requestCatchHook', error);
        if (error.response) {
          // if (error.response.status === 401) {
          //   await window.location.reload();
          // }
          if (error.response.status === 500) {
            if (error.response.data?.msg) {
              message.error(error.response.data?.msg);
            } else {
              message.error('服务请求异常，请联系管理员');
            }
          }
          if (error.response.status === 400) {
            if (error.response.data?.msg) {
              message.error(error.response.data?.msg);
            } else {
              message.error('服务请求异常，请联系管理员');
            }
          }
        }
      },
    },
  });
  return api;
};

let defaultWebApi = createApi();

export const updateWebApiConfig = (websiteConfig?: WebsiteConfig, option?: any) => {
  defaultWebApi = createApi(websiteConfig,option);
  return defaultWebApi
};
export const withInstallService = (name: string, func: (params: ServiceParams) => any) => {
  defaultWebApi.withInstall(name, func);
}
export default <T = ServiceTypes>() => {
  return defaultWebApi as WebApiService<T>;
};
