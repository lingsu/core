import gcoord, { CRSTypes } from "gcoord";

const ConverLatlng = (
  latlng: [number, number] | { lat: number; lng: number },
  crsFrom: CRSTypes,
  crsTo: CRSTypes
) => {
  var lng;
  var lat;
  if (Array.isArray(latlng)) {
    lng = Math.max(...latlng);
    lat = Math.min(...latlng);
  } else {
    lat = latlng.lat;
    lng = latlng.lng;
  }

  var result: [number, number] = gcoord.transform(
    [lng, lat], // 经纬度坐标
    crsFrom, // 当前坐标系
    crsTo // 目标坐标系
  );

  return {
    lng: result[0],
    lat: result[1],
  };
};
export const WGS84ToGCJ02 = (
  latlng: [number, number] | { lat: number; lng: number }
) => {
  return ConverLatlng(latlng, gcoord.WGS84, gcoord.GCJ02);
};
export const BdToGCJ02 = (
  latlng: [number, number] | { lat: number; lng: number }
) => {
  return ConverLatlng(latlng, gcoord.BD09, gcoord.GCJ02);
};
export const GCJ02ToBd = (
  latlng: [number, number] | { lat: number; lng: number }
) => {
  return ConverLatlng(latlng, gcoord.GCJ02, gcoord.BD09);
};

export const GCJ02ToWGS84 = (
  latlng: [number, number] | { lat: number; lng: number }
) => {
  return ConverLatlng(latlng, gcoord.GCJ02, gcoord.WGS84);
};

export const WGS84StringToGCJ02 = (latlngStr: string) => {
  var latlng = latlngStr.split(",").map(parseFloat);

  return WGS84ToGCJ02(latlng as [number, number]);
};

export const BdStringToGCJ02 = (latlngStr: string) => {
  var latlng = StringToLatlng(latlngStr);
  var result: [number, number] = gcoord.transform(
    [latlng.lng, latlng.lat], // 经纬度坐标
    gcoord.BD09, // 当前坐标系
    gcoord.GCJ02 // 目标坐标系
  );
  return {
    lat: result[1],
    lng: result[0],
  };
};
export const GCJ02StringToWGS84 = (latlngStr: string) => {
  var latlng = StringToLatlng(latlngStr);
  var result: [number, number] = gcoord.transform(
    [latlng.lng, latlng.lat], // 经纬度坐标
    gcoord.GCJ02, // 当前坐标系
    gcoord.WGS84 // 目标坐标系
  );
  return {
    lat: result[1],
    lng: result[0],
  };
};

export const StringToLatlng = (str: string | [number, number]) => {
  if (str == null) {
    throw new Error("值不能为空");
  }

  if (typeof str == "string") {
    var latlng = str.split(",").map(parseFloat);
    if (latlng.length == 2) {
      var lng = Math.max(...latlng);
      var lat = Math.min(...latlng);
      return {
        lat,
        lng,
      };
    }
  }

  if (Array.isArray(str)) {
    if (str.length == 2) {
      var lng = Math.max(...str);
      var lat = Math.min(...str);
      return {
        lat,
        lng,
      };
    }
  }

  throw new Error("格式错误");
};

export const LatlngToString = (
  latlng: { lat: number; lng: number } | [number, number]
) => {
  if (Array.isArray(latlng)) {
    latlng = StringToLatlng(latlng);
  }

  return `${latlng.lng.toFixed(6)},${latlng.lat.toFixed(6)}`;
};
