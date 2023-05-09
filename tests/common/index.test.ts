import {
  defHttp,
  downloadByUrl,
  getSearchObj,
  intOrStringArrayToStringConvert,
  optionsConvert,
  stringToDateTimeConvert,
  stringToIntArrayConvert,
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

  it("convert", () => {
    expect(intOrStringArrayToStringConvert([1, 2, 3])).toEqual("1,2,3");

    expect(
      optionsConvert([{ name: "a", id: "a" }], { isNumber: false })![0].value
    ).toEqual("a");

    expect(stringToIntArrayConvert("1,2,3")).toEqual([1, 2, 3]);

    expect(stringToDateTimeConvert("2016-11-22T15:22:44.000Z")).toEqual(
      new Date()
    );
  });

  // it("http", async () => {
  //   var result = await defHttp.get("/api?a=1&b=2");
  //   expect(result).toEqual(true);
  // });
});
