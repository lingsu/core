import creatAuth from "./auth";
import { createWebApi } from "./services/api";
import type { ServiceTypes, ServiceParams } from "./services/api";
import type { Result, PageResult, PageWarp } from "./http";
import type { Auth } from "./auth";
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
};
export { creatAuth, createWebApi };
