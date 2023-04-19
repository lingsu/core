import {
  createHttp,
  CreateHttpOptions,
  deepMerge,
  HttpResponse,
  RequestOptions,
  ResultEnum,
} from "@q25a25q/common";
import { Auth, Result } from "../typing";

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

export const createApiHttp = (auth: Auth, options?: CreateHttpOptions) => {
  const transform = {
    /**
     * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
     */
    transformRequestHook: (
      res: HttpResponse<Result>,
      options: RequestOptions
    ) => {
      // const intl = useIntl();
      // console.log('transformRequestHook',options, res)
      const { isTransformResponse, isReturnNativeResponse } = options;
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (isReturnNativeResponse) {
        return res;
      }
      // 不进行任何处理，直接返回
      // 用于页面代码可能需要直接获取code，data，message这些信息时开启
      if (!isTransformResponse) {
        return res.data;
      }
      // 错误的时候返回

      const { data } = res;
      if (!data) {
        // return '[HTTP] Request has no return value';
        throw new Error("sys.api.apiRequestFailed");
      }

      //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
      const { code, msg, success } = data;
      // 这里逻辑可以根据项目进行修改
      const hasSuccess =
        data &&
        Reflect.has(data, "code") &&
        (code === ResultEnum.SUCCESS || code === 200);
      if (hasSuccess) {
        // if (success && msg && options.successMessageMode === 'success') {
        //   //信息成功提示
        //   console.log('success',options)
        //   message.success(msg);
        // }
        return data.data;
      }

      // 在此处根据自己项目的实际情况对不同的code执行不同的操作
      // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
      let timeoutMsg = "";
      switch (code) {
        case ResultEnum.TIMEOUT:
          // timeoutMsg = t('sys.api.timeoutMessage');
          // const userStore = useUserStoreWithOut();
          // userStore.setToken(undefined);
          // userStore.logout(true);
          break;
        default:
          if (msg) {
            timeoutMsg = msg;
          }
      }

      // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
      // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
      //  if (options.errorMessageMode === 'modal') {
      //    // createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg });
      //  } else if (options.errorMessageMode === 'message') {
      //    message.error(timeoutMsg);
      //  }

      throw new Error(timeoutMsg || "sys.api.apiRequestFailed");
    },
    // requestCatchHook: () => {

    // },
    requestInterceptors: (config: any, options: any) => {
      const token = auth.getToken();
      const safeCode = auth.getSafeCode();
      // let tenantid = getTenantId();
      let tokenHeader = auth.getTokenHeader();

      // 拦截请求配置，进行个性化处理。
      // console.log('requestInterceptors',config)
      // console.log('requestInterceptors',token, config.requestOptions)
      config.headers!.Authorization = safeCode;

      if (token && config.requestOptions?.withToken !== false) {
        config.headers![tokenHeader] = token;
      }

      // Do something before request is sent
      // console.log('config', config);
      return config;
    },
  };

  return createHttp(deepMerge({ transform }, options || {}));
};
