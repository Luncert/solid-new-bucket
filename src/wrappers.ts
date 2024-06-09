

export function wrapDateNumber(v: number, bits: number = 2) {
  if (v == 0) {
    return '0'.repeat(bits);
  }
  
  let n = v;
  while (n > 0) {
    n = Math.floor(n / 10);
    bits--;
  }
  return bits > 0 ? '0'.repeat(bits) + v : v;
}

export function wrapString(v: any): string {
  if (typeof(v) === "string") {
    return v;
  }
  return v?.toString() || "";
}

export function wrapNumber(v: any) {
  if (typeof(v) === "number") {
    return v;
  }
  return 0;
}
