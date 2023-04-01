import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
// import { getSafeCode, getTenantId, getToken, getTokenHeader } from '../auth';
import type { HttpClient } from "./Axios";
import { VAxios } from "./Axios";
import { ContentTypeEnum, ResultEnum } from "./httpEnum";
import { deepMerge } from "../index";
export {
  ResultEnum,
  RequestEnum,
  ContentTypeEnum,
  ConfigEnum,
} from "./httpEnum";

// import { getAppEnvConfig } from '@/andy/env';

// const globSetting = getAppEnvConfig();

export type CreateHttpOptions = AxiosRequestConfig & {
  authenticationScheme?: string;
  transform?: HttpTransform;
  requestOptions?: RequestOptions;
  uploadOptions?: {
    uploadUrl: string;
  };
};
export type HttpResponse<T> = AxiosResponse & {};
export type HttpTransform = {
  /**
   * @description: Process configuration before request
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: CreateHttpOptions,
    options: RequestOptions
  ) => CreateHttpOptions;

  /**
   * @description: Request successfully processed
   */
  transformRequestHook?: (
    res: HttpResponse<any>,
    options: RequestOptions
  ) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: CreateHttpOptions,
    options: CreateHttpOptions
  ) => CreateHttpOptions;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: HttpResponse<any>) => HttpResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;
};

export type ErrorMessageMode = "none" | "modal" | "message" | undefined;
export type SuccessMessageMode = "none" | "success" | "error" | undefined;

export type RequestOptions = {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  // 是否处理请求结果
  isTransformResponse?: boolean;
  // 是否返回本地响应头,需要获取响应头时使用此属性
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // 接口地址，如果保留为空，则使用默认值
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 成功消息提示类型
  successMessageMode?: SuccessMessageMode;
  // 是否添加时间戳
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  //是否在标头中发送令牌
  withToken?: boolean;
};

//文件上传参数
export type UploadFileParams = {
  // 其他参数
  data?: any;
  // 文件参数接口字段名
  name?: string;
  // 文件
  file: File | Blob;
  // 文件名
  filename?: string;
  [key: string]: any;
};
//文件返回参数
export type UploadFileCallBack = {
  // 成功回调方法
  success?: any;
  // 是否返回响应头,需要获取响应头时使用此属性
  isReturnResponse?: boolean;
};

// const transform: HttpTransform = {};
// const instance = axios.create({
//   baseURL: '/api',
//   headers: { 'Content-Type': ContentTypeEnum.JSON },
// });
// // Add a request interceptor
// instance.interceptors.request.use(
//   function (config: any) {
//     const token = getToken();
//       const safeCode = getSafeCode();
//       // let tenantid = getTenantId();
//       let tokenHeader = getTokenHeader();

//       // 拦截请求配置，进行个性化处理。
//       console.log('requestInterceptors',config)
//       if(token && config.requestOptions?.withToken !== false){
//         config.headers!.Authorization = safeCode;
//         config.headers![tokenHeader] = token;
//       }

//     // Do something before request is sent
//     console.log('config', config);
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

// // Add a response interceptor
// instance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log('response', response);

//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   },
// );

function createAxios(opt?: CreateHttpOptions) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: "",
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        headers: { "Content-Type": ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        // transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 异常消息提示类型
          errorMessageMode: "message",
          // 成功消息提示类型
          successMessageMode: "success",
          // 接口地址
          // apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          // urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();

export const createHttp = (options: CreateHttpOptions): HttpClient => {
  return createAxios(options);
};

// export default instance;

export type { HttpClient };
export default defHttp;
