import { HttpClient } from "@q25a25q/common";
import type { ServiceTypes, ServiceParams } from "./services/api";
import type { BladeUser } from "./services/system/bladeUserService";
import type { Dict } from "./services/system/dictService";
import type { Menu } from "./services/system/menuService";
import type { Region } from "./services/system/regionService";
type WebsiteConfig = {
  title: string;
  logo: string;
  key: string;
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
  //http的status默认放行列表:string;
  statusWhiteList: string[];
  //配置首页不可关闭:string;
  isFirstPage: boolean;
  // 第三方系统授权地址:string;
  authUrl: string;
  // 流程设计器地址:string;
  flowDesignUrl: string;
  // 报表设计器地址(cloud端口为8108,boot端口为80):string;
  reportUrl: string;
};

type Result<T = any> = {
  code: number;
  type: "success" | "error" | "warning";
  msg: string;
  result: T;
};
type PageResult<T> = Result<PageWarp<T>>;

type PageWarp<T = any> = {
  records: T[];
  total: number;
  size: number;
  current: number;
  orders: string[];
  optimizeCountSql: boolean;
  searchCount: boolean;
  countId: string;
  maxLimit: number;
  pages: number;
};

type CurrentUser = BladeUser & { access?: string[] };

type Auth = {
  setAuthorization: (auth: any) => void;
  removeAuthorization: () => void;
  getTenantId: () => string;
  getTokenHeader: () => string;
  getToken: () => string;
  getSafeCode: () => string;
  checkAuthorization: () => boolean;
};

type WebApiService<T> = {
  auth: Auth;
  httpClient: HttpClient;
  services: T & ServiceTypes;
  withInstall: (name: string, func: (params: ServiceParams) => any) => void;
};

export type {
  ServiceTypes,
  ServiceParams,
  WebsiteConfig,
  Result,
  PageResult,
  Auth,
  PageWarp,
  BladeUser,
  Dict,
  Menu,
  Region,
  CurrentUser,
  WebApiService
};
