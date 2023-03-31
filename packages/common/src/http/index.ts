import axios, { AxiosResponse } from 'axios';
// import { getSafeCode, getTenantId, getToken, getTokenHeader } from '../auth';
import { VAxios } from './Axios';
import { ContentTypeEnum, ResultEnum } from './httpEnum';
import { AxiosTransform, CreateAxiosOptions, RequestOptions, Result } from './interfaces';
import { deepMerge } from '../index';
// import { getAppEnvConfig } from '@/andy/env';

// const globSetting = getAppEnvConfig();

const transform : AxiosTransform  = {

  
}
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




function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
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
          errorMessageMode: 'message',
          // 成功消息提示类型
          successMessageMode: 'success',
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


export const createHttp = (options: Partial<CreateAxiosOptions>) => {
  return createAxios(options);
};

// export default instance;
export default defHttp;