export const UN_DEFINED_IP = "0.0.0.0";
export function getVideoFeedURL(index: number) {
  return `/stream_${index}`;
}
export const MIN_CALIBRATION_IMAGES = 24;
export const MIN_CONTROL_CARD_WIDTH = 250;
export const MIN_FEED_HEIGHT = "50vh";
export const enum TargetType {
  AprilTag = "april_tags",
}
export const UNKNOWN = "unknown";
export type Alliance = "RED" | "BLUE";
export type UNKNOWN_TYPE = typeof UNKNOWN;
export type PNG = string;
