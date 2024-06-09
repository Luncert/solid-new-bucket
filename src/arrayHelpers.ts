
/**
 * Filter out and remove elements from array.
 * @param arr array
 * @param filter filter
 * @returns new array
 */
export function removeElementsFromArray<T>(arr: T[], filter: (t: T) => boolean): T[] {
  const idx: number[] = [];
  arr.forEach((t, i) => {
    if (filter(t)) {
      idx.push(i);
    }
  });
  return idx.map(i => arr.splice(i, 1)[0]);
}

/**
 * Copy range or array.
 * @param arr array
 * @param start start pos
 * @param end end pos
 * @returns sub range of array
 */
export function copyOfRange<T>(arr: T[], start: number, end: number): T[] {
  const r: T[] = [];
  start = Math.max(0, start);
  end = Math.min(arr.length, end);
  for (let i = start; i < end; i++) {
    r.push(arr[i]);
  }
  return r;
}

/**
 * Find first element in array which passes test.
 * @param arr array
 * @param test test
 * @returns index
 */
export function indexOf<T>(arr: T[], test: Func<T, boolean>) {
  for (let i = 0; i < arr.length; i++) {
    if (test(arr[i])) {
      return i;
    }
  }
  return -1;
}
