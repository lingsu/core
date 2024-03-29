import { message } from "antd";
import downloadByUrl from "./downloadByUrl";
import { getToken, getTokenHeader } from "./auth";
import { AntdPage, BladeRequest, PageResult, RequestOption, RequestParams } from "../typing";




// const basicKey = window.btoa(`${website.clientId}:${website.clientSecret}`);

export function isURLSearchParams(val: any) {
  return (
    typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams
  );
}

export const DefaultOption = {
  baseURL: "",

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [
    function (config: RequestOption, data: any, headers: any) {
      // Do whatever you want to transform the data

      if (headers?.["Content-Type"] == "application/json") {
        return JSON.stringify(data);
      }

      return data;
    },
  ],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [
    function (config: RequestOption, data: any) {
      // Do whatever you want to transform the data
      const { code } = data;
      if (code === 200) {
        return data.data;
      }

      const error = new ApiError(code);
      // 将额外的信息附加到错误对象上。
      error.info = data;
      throw error;

      // return data;
    },
  ],
  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  // paramsSerializer: function (params) {
  //   return Qs.stringify(params, {arrayFormat: 'brackets'})
  // },
  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: "json", // default

  isReturnNativeResponse: false,
  isTransformResponse: false,
  isTransformRequest: true,
  withToken: true,
} as RequestOption;


export function buildURL(url: string, params: any, options: RequestOption) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var urlSearchParams = getParamObject(params || {});

  if (urlSearchParams.toString()) {
    const urlSign = url.indexOf("?") !== -1 ? "&" : "?";
    url = url + urlSign + urlSearchParams.toString();
  }

  return url;
}

export class ApiError extends Error {
  // response: Response;
  info: any;
  status: number;
  constructor(status: number) {
    super("API异常");
    this.status = status;
    this.name = 'ApiError';
  }
}

const getParamObject = (val: any) => {
  if (isURLSearchParams(val)) {
    return val;
  }
  return new URLSearchParams([...Object.entries(val)] as any);
};

export const createInstance = (instanceConfig: RequestOption): BladeRequest => {
  const request = async <T>(
    url: string,
    init: RequestParams,
    config?: RequestOption
  ) => {
    var { params, body, ...rest } = init;

    const requestInit = { ...rest } as RequestInit;

    config = {
      ...instanceConfig,
      ...config,
    };

    requestInit.headers = {
      // "Content-Type": "application/json",
      ...requestInit.headers,
      ...config.headers,
    };
    config.transformRequest.forEach((fn) => {
      requestInit.body = fn(config!, body, requestInit.headers);
    });

    var token = getToken();
    if (config.withToken && token) {
      // requestInit.headers!["Authorization"] = `Basic ${basicKey}`;
      (requestInit.headers as any)![getTokenHeader()] = token;
    }

    try {
      var path = buildURL(url, params, config);
      const res = await fetch(`${config.baseURL}${path}`, requestInit);
      if (!res.ok) {
        const error = new ApiError(res.status);
        // 将额外的信息附加到错误对象上。
        try {
          error.info = await res.json();
        } catch {}
        throw error;
      }
      if (config.isReturnNativeResponse) {
        return res;
      }

      var data:any = null;

      if (config.responseType === "json") {
        data = await res.json();
      }else if (config.responseType === "text") {
        data = await res.text();
      }else if (config.responseType === "stream") {
        data = await res.blob();
      } else if (config.responseType === "arraybuffer") {
        data = await res.arrayBuffer();
      } else{
        throw new Error("responseType not support");
      }
        
      if (config.isTransformResponse) {
        return data as T;
      }

      config.transformResponse.forEach((fn) => {
        data = fn(config!, data);
      });

      return data as T;
    } catch (error: any) {
      if (config.isReturnNativeResponse || config.isTransformResponse) {
        throw error;
      }
      if (error.status === 200 && error.info) {
        const { msg } = error.info;
        message.error(msg);
      }
      throw error;
    }
  };
  const get = async <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ): Promise<T> => {
    const requestInit = { method: "GET", ...data };

    return request<T>(url, requestInit, option) as Promise<T>;
  };
  const _delete = async <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ): Promise<T> => {
    const requestInit = { method: "DELETE", ...data };

    return request<T>(url, requestInit, option) as Promise<T>;
  };
  const put = async <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ): Promise<T> => {
    const requestInit = { method: "PUT", ...data };

    return request<T>(url, requestInit, option) as Promise<T>;
  };
  const getPage = async <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ): Promise<AntdPage<T>> => {
    const requestInit = { method: "GET", ...data };
    if (requestInit.params && "pageSize" in requestInit.params) {
      requestInit.params.size = requestInit.params.pageSize;
      delete requestInit.params.pageSize;
    }
    var res = (await request<T>(url, requestInit, option)) as PageResult<T>;
    return {
      success: true,
      data: res.records,
      total: res.total,
    };
  };
  const download = async (
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ) => {
    var urlSearchParams = getParamObject({
      ...data?.params,
      [getTokenHeader()]: getToken(),
    });

    var  config = {
      ...instanceConfig,
      ...option,
    };

    var path = buildURL(url, urlSearchParams, config);
    
    return downloadByUrl({ url: `${config.baseURL}${path}` });
  };

  const post = async <T = any>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ): Promise<T> => {
    const requestInit: RequestParams = { method: "POST", ...data };

    return request(url, requestInit, option) as Promise<T>;
  };

  const instance = {
    get,
    post,
    download,
    getPage,
    delete: _delete,
    put,
    defaults: instanceConfig,
  };

  return instance;
};

const instance = createInstance(DefaultOption);
export default instance;
