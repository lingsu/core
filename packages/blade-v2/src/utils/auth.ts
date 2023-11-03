import defaultConfig from "../defaultConfig";
import WebStorage from "./cache";

let userCache: null | Record<string, any>;
const xsrfHeaderName = "Authorization";

export const getTokenHeader = () => {
  return defaultConfig.tokenHeader;
};

export function getUser() {
  if (userCache == undefined) {
    var user = WebStorage.get(xsrfHeaderName);

    // const user = localStorage.getItem("user");
    if (!user) {
      userCache = null;
    } else {
      // userCache = JSON.parse(user);
      userCache = user;
    }
  }
  return userCache;
}
export function setUser(data: any) {
  userCache = data;
  
  WebStorage.set(xsrfHeaderName, data, data.expires_in);

  // localStorage.setItem("user", JSON.stringify(data));
}
export function removeUser() {
  userCache = null;
  WebStorage.remove(xsrfHeaderName);

  // localStorage.removeItem("user");
}

export function getToken() {
  const user = getUser();
  return user?.access_token;
}
