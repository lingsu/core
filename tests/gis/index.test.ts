import {
  stringToLatlng,
  distance,
  destination,
  toLatLngLiteral,
  stringToCoordinates,
  area
} from "@q25a25q/gis";

describe("gis", () => {
  it("stringToLatlng", () => {
    expect(stringToLatlng("120.687130,28.002329")).toEqual({
      lat: 28.002329,
      lng: 120.68713,
    });
  });
  it("stringToCoordinates", () => {
    expect(
      stringToCoordinates("120.687130,28.002329;120.1,28.1")
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
      stringToCoordinates("120.687130,28.002329@120.1,28.1",'@')
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
  it("toLatLngLiteral", () => {
    expect(toLatLngLiteral([120.68713, 28.002329])).toEqual({
      lat: 28.002329,
      lng: 120.68713,
    });
    expect(toLatLngLiteral({ lat: 28.002329, lng: 120.68713 })).toEqual({
      lat: 28.002329,
      lng: 120.68713,
    });
  });

  it("distance", () => {
    expect(distance([120.67813, 27.997405], [120.686209, 27.996039])).toEqual(
      807.6277108468807
    );
  });
  it("destination", () => {
    expect(destination([120.67813, 27.997405], 100, 45)).toEqual({
      lat: 27.998040913651455,
      lng: 120.67885020578812,
    });
  });
  it("area", () => {
    expect(area([
      [108.09876, 37.200787], // 注意：polygon首尾坐标要一致
      [106.398901, 33.648651],
      [114.972103, 33.340483],
      [113.715685, 37.845557],
      [108.09876, 37.200787]
    ])).toEqual(287883719772.89166);
  });
});
