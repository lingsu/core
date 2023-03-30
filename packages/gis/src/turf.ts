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
