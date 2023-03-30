import {
  StringToLatlng,
  Distance,
  Destination,
  ToLatLngLiteral,
  StringToCoordinates,
} from "@q25a25q/gis";

describe("gis", () => {
  it("StringToLatlng", () => {
    expect(StringToLatlng("120.687130,28.002329")).toEqual({
      lat: 28.002329,
      lng: 120.68713,
    });
  });
  it("StringToCoordinates", () => {
    expect(
      StringToCoordinates("120.687130,28.002329;120.1,28.1")
    ).toEqual([
      {
        lat: 28.002329,
        lng: 120.68713,
      },
      {
        lat: 28.1,
        lng: 120.1,
      },
    ]);

    expect(
      StringToCoordinates("120.687130,28.002329@120.1,28.1",'@')
    ).toEqual([
      {
        lat: 28.002329,
        lng: 120.68713,
      },
      {
        lat: 28.1,
        lng: 120.1,
      },
    ]);

  });
  it("ToLatLngLiteral", () => {
    expect(ToLatLngLiteral([120.68713, 28.002329])).toEqual({
      lat: 28.002329,
      lng: 120.68713,
    });
    expect(ToLatLngLiteral({ lat: 28.002329, lng: 120.68713 })).toEqual({
      lat: 28.002329,
      lng: 120.68713,
    });
  });

  it("Distance", () => {
    expect(Distance([120.67813, 27.997405], [120.686209, 27.996039])).toEqual(
      807.6277108468807
    );
  });
  it("Destination", () => {
    expect(Destination([120.67813, 27.997405], 100, 45)).toEqual({
      lat: 27.998040913651455,
      lng: 120.67885020578812,
    });
  });
});
