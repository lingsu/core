import { WebStorage } from "@q25a25q/common";

describe("common", () => {
  it("WebStorage", () => {
    var key = "123";
    WebStorage.set(key, key);
    expect(WebStorage.get(key)).toEqual(key);
  });
});
