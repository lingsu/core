import defaultConfig from "../defaultConfig";

let userCache: null | Record<string, any>;


export const getTokenHeader = () => {
  return defaultConfig.tokenHeader;
};

export function getUser() {
  if (userCache == undefined) {
    const user = localStorage.getItem("user");
    if (!user) {
      userCache = null;
    } else {
      userCache = JSON.parse(user);
    }
  }
  return userCache;
}
export function setUser(data: any) {
  userCache = data;
  localStorage.setItem("user", JSON.stringify(data));
}
export function removeUser() {
  userCache = null;
  localStorage.removeItem("user");
}

export function getToken() {
  const user = getUser();
  return user?.access_token;
}
