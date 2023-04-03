import { WebStorage } from "@q25a25q/common";
import { Base64 } from "js-base64";
import { Auth } from "../typing";

const xsrfHeaderName = "Authorization";
export default (option: {
  xsrfHeaderName?: string;
  clientId: string;
  clientSecret: string;
  tenantId: string;
  tokenHeader: string;
}): Auth => {
  const website = { xsrfHeaderName, ...option };

  function setAuthorization(auth: any) {
    WebStorage.set(website.xsrfHeaderName, auth, auth.expires_in);
  }

  function removeAuthorization() {
    WebStorage.remove(website.xsrfHeaderName);
  }
  const getTenantId = () => {
    return website.tenantId;
  };
  const getTokenHeader = () => {
    return website.tokenHeader;
  };
  function getToken() {
    var auth = WebStorage.get(website.xsrfHeaderName);
    return auth?.access_token;
  }

  const getSafeCode = () => {
    return `Basic ${Base64.encode(
      `${website.clientId}:${website.clientSecret}`
    )}`;
  };

  function getAuthorization() {
    var auth = getToken();
    if (auth) {
      // console.log('auth', auth);
      return "Bearer " + auth;
    }
    return null;
  }
  function checkAuthorization() {
    if (getAuthorization()) {
      return true;
    }
    return false;
  }

  return {
    setAuthorization,
    removeAuthorization,
    getTenantId,
    getTokenHeader,
    getToken,
    getSafeCode,
    checkAuthorization,
  };
};
