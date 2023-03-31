import { WebStorage } from "./cache";
import type { TargetContext } from "./typing";
export * from "./file";
import {
  intOrStringArrayToStringConver,
  optionConver,
  stringToIntArrayConver,
  stringToDateTimeConver,
} from "./conver";

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
export {
  WebStorage,
  intOrStringArrayToStringConver,
  optionConver,
  stringToIntArrayConver,
  stringToDateTimeConver,
};
