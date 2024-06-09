
/**
 * Check if array or string is not empty.
 * @param v array of any, string or undefined
 * @returns true if target is not empty
 */
export function isNotEmpty<T>(v?: T[]): boolean
export function isNotEmpty(v?: string): boolean
export function isNotEmpty(v: any) {
  if (!v) return false
  if (typeof(v) === "string") {
    return v.length > 0
  }
  if (typeof(v) === "object") {
    if (Array.isArray(v)) {
      return v.length > 0
    }
    return Object.keys(v).length > 0
  }
  return false
}

/**
 * Check if value is number.
 * @param v any
 * @returns true if value is number
 */
export function isNumber(v: any) {
  return typeof(v) === "number";
}

/**
 * Compare two date string.
 * @param a date 1
 * @param b date 2
 * @returns true if a is later than b
 */
export function compareDateString(a: string, b: string): number {
  return Date.parse(a) - Date.parse(b);
}

/**
 * Check whether there is an element in b exists in a as well.
 * @param a array 1
 * @param b array 2
 * @returns boolean
 */
export function containsAny(a: any[], b: any[]) {
  for (let i of a) {
    for (let j of b) {
      if (i === j) {
        return true;
      }
    }
  }
  return false;
}
