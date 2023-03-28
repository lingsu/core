import { StringToLatlng } from "@q25a25q/gis";

describe("gis", () => {
  it("StringToLatlng", () => {
    expect(StringToLatlng("120.687130,28.002329")).toEqual({
      lat: 28.002329,
      lng: 120.68713,
    });
  });
});
