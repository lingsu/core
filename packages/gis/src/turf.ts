import distance from "@turf/distance";
import destination from "@turf/destination";
import { point } from "@turf/helpers";
import { ToLatLngLiteral } from ".";
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

export const Destination = (
  origin: LatLngExpression,
  distance: number,
  bearing: number,
  options: {} = { units: "meters" }
) => {
  origin = ToLatLngLiteral(origin);

  var originPoint = point([origin.lng, origin.lat]);

  var result =  destination(originPoint, distance, bearing, options);
  return ToLatLngLiteral(result.geometry.coordinates as [number, number]);
};
