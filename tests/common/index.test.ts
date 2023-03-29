import { downloadByUrl, getSearchObj, WebStorage } from "@q25a25q/common";

describe("common", () => {
  it("WebStorage", () => {
    var key = "123";
    WebStorage.set(key, key);
    expect(WebStorage.get(key)).toEqual(key);
  });
  it("getSearchObj", () => {
    expect(window.location.search).toEqual("?a=1&b=2");
    expect(getSearchObj(window.location.search)).toEqual({
      a: "1",
      b: "2",
    });
  });
  it("downloadByUrl", () => {
    expect(
      downloadByUrl({
        url: "http://localhost?a=1&b=2",
      })
    ).toEqual(true);
  });
});
