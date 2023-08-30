let userCache: null | Record<string, any>;

export const website = {
  title: "saber",
  logo: "S",
  key: "saber", //配置主键,目前用于存储
  clientId: "saber", // 客户端id
  clientSecret: "saber_secret", // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tenantId: "000000", // 管理组租户编号
  captchaMode: true, // 是否开启验证码模式
  switchMode: false, // 是否开启部门切换模式
  lockPage: "/lock",
  apiUrl: "/api",
  uploadUrl: "/uploadUrl",
  tokenTime: 3000,
  tokenHeader: "Blade-Auth",
  //http的status默认放行列表
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
};
export const getTokenHeader = () => {
  return website.tokenHeader;
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
