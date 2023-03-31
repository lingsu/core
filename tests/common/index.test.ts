import {
  defHttp,
  downloadByUrl,
  getSearchObj,
  intOrStringArrayToStringConver,
  optionConver,
  stringToDateTimeConver,
  stringToIntArrayConver,
  WebStorage,
} from "@q25a25q/common";

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

  it("conver", () => {
    expect(intOrStringArrayToStringConver([1, 2, 3])).toEqual("1,2,3");

    expect(
      optionConver({ name: "a", id: "a" }, { isNumber: false })?.value
    ).toEqual("a");

    expect(stringToIntArrayConver("1,2,3")).toEqual([1, 2, 3]);

    expect(stringToDateTimeConver("2016-11-22T15:22:44.000Z")).toEqual(
      new Date()
    );
  });

  // it("http", async () => {
  //   var result = await defHttp.get("/api?a=1&b=2");
  //   expect(result).toEqual(true);
  // });
});
