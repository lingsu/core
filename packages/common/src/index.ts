import { WebStorage } from "./cache";
import type { TargetContext } from "./typing";
export * from "./file";
export * from "./is";
import { isObject } from "./is";
import defHttp, {
  createHttp,
  ResultEnum,
  RequestEnum,
  ContentTypeEnum,
  ConfigEnum,
} from "./http";
import type {
  CreateHttpOptions,
  HttpTransform,
  ErrorMessageMode,
  SuccessMessageMode,
  RequestOptions,
  UploadFileParams,
  UploadFileCallBack,
  HttpResponse,
  HttpClient,
} from "./http";

export {
  intOrStringArrayToStringConvert,
  optionsConvert,
  stringToIntArrayConvert,
  stringToDateTimeConvert,
} from "./converts";

export type { Options, OptionsConvertOption } from "./converts";

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string;
    noopener?: boolean;
    noreferrer?: boolean;
  }
): void {
  const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");

  window.open(url, target, feature.join(","));
}
export function cloneObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
export const getSearchObj = (search: string) => {
  return Object.fromEntries(new URLSearchParams(search).entries());
};

export type {
  CreateHttpOptions,
  HttpTransform,
  ErrorMessageMode,
  SuccessMessageMode,
  RequestOptions,
  UploadFileParams,
  UploadFileCallBack,
  HttpResponse,
  HttpClient,
};
export {
  WebStorage,
  // intOrStringArrayToStringConvert,
  // optionsConvert,
  // stringToIntArrayConvert,
  // stringToDateTimeConvert,
  defHttp,
  createHttp,
  ResultEnum,
  RequestEnum,
  ContentTypeEnum,
  ConfigEnum,
};
