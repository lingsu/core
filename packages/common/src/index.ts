import { WebStorage } from "./cache";
import type { TargetContext } from "./typing";
export * from './file';
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

export const getSearchObj = (search: string) => {
  return Object.fromEntries(
    new URLSearchParams(search).entries()
  );
};
export { WebStorage };
