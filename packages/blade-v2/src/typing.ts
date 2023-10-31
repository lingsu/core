import { BladeUserService } from "./services/system/bladeUserService";
import { DictService } from "./services/system/dictService";
import { FileService } from "./services/system/fileService";
import { RegionService } from "./services/system/regionService";

export type BladeConfig = {
  title: string;
  logo: string;
  indexTitle: string;
  clientId: string;
  clientSecret: string;
  tenantMode: boolean;
  tenantId: string;
  captchaMode: boolean;
  switchMode: boolean;
  lockPage: string;
  apiUrl: string;
  uploadUrl: string;
  tokenTime: number;
  tokenHeader: string;
  statusWhiteList: any[];
  isFirstPage: boolean;
  fistPage: FistPage;
  menu: Menu;
  authUrl: string;
  flowDesignUrl: string;
  reportUrl: string;
};
export type FistPage = {
  label: string;
  value: string;
  params: FistPageParams;
  query: FistPageQuery;
  meta: FistPageMeta;
  group: any[];
  close: boolean;
};
export type FistPageParams = {};
export type FistPageQuery = {};
export type FistPageMeta = {
  i18n: string;
};
export type Menu = {
  iconDefault: string;
  props: MenuProps;
};
export type MenuProps = {
  label: string;
  path: string;
  icon: string;
  children: string;
};

export type PageResult<T> = {
  records: T[];
  total: number;
  success:boolean;
};
export type RequestParams = RequestInit & {
  params?: any;
  // data?: any;
};
export declare type AntdPage<T> = {
  data: T[] | undefined;
  success?: boolean;
  total?: number;
};

export type RequestOption = {
  baseURL?: string;
  uploadUrl?: string;
  isReturnNativeResponse?: boolean;
  isTransformResponse?: boolean;
  withToken?: boolean;
  headers?: HeadersInit;
  responseType: "arraybuffer" | "document" | "json" | "text" | "stream";
  transformRequest: ((config: RequestOption, data: any, headers: any) => any)[];

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: ((config: RequestOption, data: any) => any)[];

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  // paramsSerializer: function (params) {
  //   return Qs.stringify(params, {arrayFormat: 'brackets'})
  // },

  // handleError?: (error: ApiError, option: Option) => void;
  // handler?: <T = any>(
  //   url: string,
  //   requestInit: RequestInit,
  //   option: Option
  // ) => Promise<T> | Promise<void>;
};
export type BladeRequest = {
  get: <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ) => Promise<T>;
  put: <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ) => Promise<T>;
  getPage: <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ) => Promise<AntdPage<T>>;
  download: (
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ) => Promise<any>;
  post: <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ) => Promise<T>;
  delete: <T>(
    url: string,
    data?: RequestParams,
    option?: RequestOption
  ) => Promise<T>;
};
export type ReactBladeState = {
  setState: (state: any) => void;
  request: BladeRequest;
  services: {
    // oauth: OauthService;
    bladeUser: BladeUserService;
    dict: DictService;
    // menu: MenuService;
    region: RegionService;
    file: FileService;
  }
} & BladeConfig;
