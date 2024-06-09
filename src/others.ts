import { Context, useContext } from "solid-js";

export function useCtx<T>(c: Context<T>): T {
  const context = useContext(c);
  if (!context) {
    throw new Error("cannot find a " + JSON.stringify(c))
  }
  return context;
}

export function names(...v: (string | undefined)[]) {
  return v.filter((name) => Boolean(name)).join(' ');
}

export function clone(obj: any) {
  const type = typeof(obj);
  switch (type) {
    case 'object': {
      let r: any = Array.isArray(obj) ? [] : {};
      for (let key of Object.keys(obj)) {
        r[key] = clone(obj[key]);
      }
      return r;
    }
    default:
      return obj;
  }
}
