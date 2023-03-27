import {Hello} from '@q25a25q/common';


describe("utils", () => {
  it("lighten", () => {
    const color = "#808080";
    expect(color).toBe("#808080");
  });
  it("Hello", () => {
    expect(Hello('lv')).toBe("hello lv");
  });
});
