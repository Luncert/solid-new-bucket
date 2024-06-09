
/**
 * Genereate a sequence.
 * @param start start
 * @param end end
 * @param step step
 * @returns array
 */
export function sequence(start: number, end: number, step: number = 1) {
  const r = [];
  for (let i = start; i < end; i += step) {
    r.push(i);
  }
  return r;
}

/**
 * Generate a array of size.
 * @param size size
 * @returns 
 */
export function iterate(size: number) {
  return Array.from(Array(size).keys())
}