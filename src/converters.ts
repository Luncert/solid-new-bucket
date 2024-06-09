import { wrapDateNumber } from "./wrappers";

/**
 * Parse and format timestamp from number to string.
 * @param timestamp time
 * @param showTime show only date if false
 * @param showMilliseconds show ms if true
 * @returns formatted string
 */
export function parseTimestamp(timestamp: number, showTime?: boolean, showMilliseconds?: boolean) {
  const date = new Date(timestamp);
  // TODO: toLocaleString
  // return date.toLocaleString(undefined, {
  // });
  let r = `${wrapDateNumber(date.getFullYear())}-${wrapDateNumber(date.getMonth() + 1)}-${wrapDateNumber(date.getDate())}`;
  if (showTime) {
    r += ` ${wrapDateNumber(date.getHours())}:${wrapDateNumber(date.getMinutes())}:${wrapDateNumber(date.getSeconds())}`;
  }
  if (showMilliseconds) {
    r += `.${wrapDateNumber(date.getMilliseconds(), 3)}`;
  };
  return r;
}

export function toCapital(v: string) {
  return v.charAt(0).toUpperCase() + v.substring(1);
}