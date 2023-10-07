import { useEffect } from "react";
import useReactBlade from "../hooks/useReactBlade";
import { BladeConfig } from "../typing";

function useDirectStoreUpdater(
  key: keyof BladeConfig,
  value: unknown,
  setState: (state: any) => void
) {
  useEffect(() => {
    if (typeof value !== "undefined") {
      setState({ [key]: value });
    }
  }, [value]);
}

export default ({
  title,
  logo,
  indexTitle,
  clientId,
  clientSecret,
  tenantMode,
  tenantId,
  captchaMode,
  switchMode,
  lockPage,
  apiUrl,
  uploadUrl,
  tokenTime,
  tokenHeader,
  statusWhiteList,
  isFirstPage,
  fistPage,
  menu,
  authUrl,
  flowDesignUrl,
  reportUrl,
}: Partial<BladeConfig>) => {
  const store = useReactBlade();

  useDirectStoreUpdater("title", title, store.setState);
  useDirectStoreUpdater("logo", logo, store.setState);
  useDirectStoreUpdater("indexTitle", indexTitle, store.setState);
  useDirectStoreUpdater("clientId", clientId, store.setState);
  useDirectStoreUpdater("clientSecret", clientSecret, store.setState);
  useDirectStoreUpdater("tenantMode", tenantMode, store.setState);
  useDirectStoreUpdater("tenantId", tenantId, store.setState);
  useDirectStoreUpdater("captchaMode", captchaMode, store.setState);
  useDirectStoreUpdater("switchMode", switchMode, store.setState);
  useDirectStoreUpdater("lockPage", lockPage, store.setState);
  useDirectStoreUpdater("apiUrl", apiUrl, store.setState);
  useDirectStoreUpdater("uploadUrl", uploadUrl, store.setState);
  useDirectStoreUpdater("tokenTime", tokenTime, store.setState);
  useDirectStoreUpdater("tokenHeader", tokenHeader, store.setState);
  useDirectStoreUpdater("statusWhiteList", statusWhiteList, store.setState);
  useDirectStoreUpdater("isFirstPage", isFirstPage, store.setState);
  useDirectStoreUpdater("fistPage", fistPage, store.setState);
  useDirectStoreUpdater("menu", menu, store.setState);
  useDirectStoreUpdater("authUrl", authUrl, store.setState);
  useDirectStoreUpdater("flowDesignUrl", flowDesignUrl, store.setState);
  useDirectStoreUpdater("reportUrl", reportUrl, store.setState);

  return null;
};
