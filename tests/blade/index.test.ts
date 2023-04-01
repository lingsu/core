import { creatAuth, createWebApi } from "@q25a25q/blade";
import website from "./website";

describe("blade", () => {


  const authorization = { name: 'lv', access_token: "123", expires_in: 30};

  it("creatAuth", () => {
    var auth = creatAuth(website);
    expect(auth.getTenantId()).toEqual("000000");
    expect(auth.getTokenHeader()).toEqual("Blade-Auth");
    // expect(auth.getToken()).toEqual("000000");
    expect(auth.getSafeCode()).toEqual("Basic c2FiZXI6c2FiZXJfc2VjcmV0");
    expect(auth.checkAuthorization()).toEqual(false);
  });

  it("checkAuthorization", () => {
    var auth = creatAuth(website);
    auth.setAuthorization(authorization);
    expect(auth.checkAuthorization()).toEqual(true);
    auth.removeAuthorization();
    expect(auth.checkAuthorization()).toEqual(false);
  });

  it("getToken", () => {
    var auth = creatAuth(website);
    auth.setAuthorization(authorization);
    expect(auth.getToken()).toEqual(authorization.access_token);
    auth.removeAuthorization();
    expect(auth.getToken()).toEqual(undefined);
  });

  // it("createWebApi", async () => {
  //    var api = createWebApi(website);
  //    var s = await api.services.user.getCaptcha();
  //   expect(s).toEqual('123');
  // });

});
