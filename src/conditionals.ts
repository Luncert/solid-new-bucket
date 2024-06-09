
/**
 * Invoke function or return value if condition is true.
 * @param condition any
 * @param value function to be invoked or value to be return
 * @param defaultValue fallback value, optional
 */
export function conditional<T>(condition: any, value: () => void): void;
export function conditional<T>(condition: any, value: T, defaultValue?: T): T;
export function conditional<T>(condition: any, value: Supplier<T>, defaultValue?: T): T;
export function conditional(condition: any, value: any, defaultValue?: any) {
  if (typeof(value) === "function") {
    if (condition) {
      const r = value()
      if (r) {
        return r
      }
    }
    return defaultValue
  }

  if (typeof(value === "string")) {
    return condition ? value : (defaultValue || '')
  }

  if (typeof(value) === "number") {
    return condition ? value : (defaultValue || 0)
  }

  if (condition) {
    return value
  } else if (defaultValue !== undefined && defaultValue !== null) {
    return defaultValue
  }
}
