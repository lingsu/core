import distance from "@turf/distance";
import destination from "@turf/destination";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point, polygon } from "@turf/helpers";
import { ToLatLngLiteral, ToTurfLatlng } from ".";
import type { LatLngExpression } from "./typing";

/**
 * 计算距离
 * @param from
 * @param to
 * @param options
 * @return 默认返回米
 */
export const Distance = (
  from: LatLngExpression,
  to: LatLngExpression,
  options: { units: any } = { units: "meters" }
) => {
  from = ToLatLngLiteral(from);
  to = ToLatLngLiteral(to);

  var fromPoint = point([from.lng, from.lat]);
  var toPoint = point([to.lng, to.lat]);

  return distance(fromPoint, toPoint, options);
};
/**
 * 获取一个点并计算给定距离(以度、弧度、英里或公里为单位)的目标点的位置。
 * @param origin
 * @param distance 默认米
 * @param bearing
 * @param options
 */
export const Destination = (
  origin: LatLngExpression,
  distance: number,
  bearing: number,
  options: {} = { units: "meters" }
) => {
  origin = ToLatLngLiteral(origin);

  var originPoint = point(ToTurfLatlng(origin));

  var result = destination(originPoint, distance, bearing, options);
  return ToLatLngLiteral(result.geometry.coordinates as [number, number]);
};

/**
 * 获取一个点和一个多边形或多个多边形，并确定该点是否位于该多边形内部。多边形可以是凸的，也可以是凹的。
 * @param latlng
 * @param polygonLatlngs
 * @param options
 */
export const BooleanPointInPolygon = (
  latlng: LatLngExpression,
  polygonLatlngs: LatLngExpression[],
  option = { ignoreBoundary: false }
) => {
  if (!latlng || !polygonLatlngs || polygonLatlngs.length === 0) {
    return false;
  }
  var pt = point(ToTurfLatlng(latlng));
  var latlngs = polygonLatlngs.map(ToTurfLatlng);
  latlngs.push(latlngs[0]);
  var poly = polygon([latlngs]);
  return booleanPointInPolygon(pt, poly, option);
};

// const getRectangle = (lng: any, lat: any, distance: number) => {

//   var s = BdStringToGCJ02(`${lng},${lat}`);
//   var center = [s.lng, s.lat];

//   var bearing = -45;
//   var coordinates: any[] = [];
//   while (coordinates.length < 4) {
//     var point = turf.point(center);
//     var options: any = { units: "meters" };

//     var destination = turf.destination(point, distance, bearing, options);

//     coordinates.push(destination.geometry.coordinates.reverse());

//     bearing += 90;
//   }
//   console.log("coordinates", coordinates);
//   return coordinates;
// };
/**
 * 生成一个矩形坐标
 * @param len 长
 * @param wide 宽
 */
export function RetCoordinateList({
  len,
  wide,
  azimuth,
  lat,
  lng,
}: {
  len: any;
  wide: any;
  azimuth: any;
  lat: any;
  lng: any;
}) {
  lat = parseFloat(lat);
  lng = parseFloat(lng);
  len = (len * 0.9) / 100000.0;
  wide = wide / 100000.0;
  var outerCoords = new Array();
  //List < Vector > outerCoords = new List<Vector>();
  //Vector vector = new Vector(lat, lng, 0);
  var vector = {
    lat,
    lng,
  };
  //左顶点
  outerCoords.push(vector);
  var bLat, bLng;
  //右上角点
  bLng = Math.sin((azimuth * Math.PI) / 180) * len;
  bLat = Math.cos((azimuth * Math.PI) / 180) * len;
  outerCoords.push({
    lat: lat + bLat,
    lng: lng + bLng,
  });
  //纬度偏移
  var latShift = (lat + bLat - vector.lat) / 2;
  //左下角点
  bLng = Math.sin((azimuth * Math.PI) / 180 + (90 * Math.PI) / 180) * wide;
  bLat = Math.cos((azimuth * Math.PI) / 180 + (90 * Math.PI) / 180) * wide;
  //经度偏移
  var lngShift = (lng + bLng - vector.lng) / 2;
  //右下角点
  outerCoords.push({
    lat: lat + bLat + Math.cos((azimuth * Math.PI) / 180) * len,
    lng: lng + bLng + Math.sin((azimuth * Math.PI) / 180) * len,
  });
  outerCoords.push({
    lat: lat + bLat,
    lng: lng + bLng,
  });

  //var outerCoords1 = new Array();
  outerCoords.forEach(function (value) {
    value.lat = value.lat - latShift;
    value.lng = value.lng - lngShift;
    //outerCoords1.push(L.latLng(value.Latitude + latShift, value.Longitude - lngShift))
  });
  return outerCoords;
}
