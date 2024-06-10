import { createSignal, Accessor, createMemo, SignalOptions, splitProps } from "solid-js"


/**
 * Stamped Bucket help to trigger rerendering after updating object without recreate new object.
 * @returns StampedBucket<T>
 */
export function stampedBucket<T>(value: T, options?: {
  beforeUpdate?: (value: T) => void;
  afterUpdate?: (value: T) => void;
  localStorageName?: string;
}): StampedBucket<T> {
  // load from local storage
  if (options?.localStorageName) {
    const raw = localStorage.getItem(options.localStorageName);
    if (raw) {
      value = JSON.parse(raw);
    }
  }

  const [timestamp, setTimestamp] = createSignal(new Date().getTime());
  const v: Accessor<StampedData<T>> = createMemo(() => {
    return {
      timestamp: timestamp(),
      data: value,
      markChanged() {
        setTimestamp(new Date().getTime());
      }
    };
  });
  const setV = (newValue?: T) => {
    if (newValue) {
      value = newValue
    }
    setTimestamp(new Date().getTime())
  };

  const call = function(updater?: (v: T) => void) {
    if (updater) {
      options?.beforeUpdate?.(value)

      updater(value)

      // save to local storage
      if (options?.localStorageName) {
        localStorage.setItem(options.localStorageName, value ? JSON.stringify(value) : "")
      }
      setV();
  
      options?.afterUpdate?.(value)
    }

    // add mapper function
    (call as any).map = <O>(mapper: (v: T) => O) => {
      return mapper(v().data);
    }

    // add markChanged function
    (call as any).markChanged = () => {
      setTimestamp(new Date().getTime())
    }

    (call as any).reset = (v: T) => {
      setV(v)
    }

    return v().data
  }

  return call as any
}

function getFieldOfObject(o: any, paths: ObjectIndex[]) {
  for (let i = 0; i < paths.length - 1; i++) {
    o = o[paths[i]];
    if (!o) {
      throw new Error(`cannot find ${paths.join('.')} in ${o}`)
    }
  }
  return o[paths[paths.length - 1]]
}

function setFieldOfObject(o: any, newValue: any, paths: ObjectIndex[]) {
  for (let i = 0; i < paths.length - 1; i++) {
    o = o[paths[i]];
    if (!o) {
      throw new Error(`cannot find ${paths.join('.')} in ${o}`)
    }
  }
  o[paths[paths.length - 1]] = newValue
}

export function asBucket<O, FieldType, DecadeType>(s: StampedBucket<O>, path: ObjectIndex[], mapper?: Mapper<FieldType, DecadeType>): Bucket<FieldType> {
  const getField = (data: O) => {
    let v = getFieldOfObject(data, path)
    return mapper ? mapper.from?.(v) : v
  }
  const setField = (data: O, v: any) => {
    if (mapper) {
      v = mapper.to?.(v)
    }
    setFieldOfObject(data, v, path)
  }
  return (t) => {
    if (t != undefined) {
      s(data => {
        if (typeof(t) === "function") {
          const oldValue = getField(data)
          // @ts-ignore
          setField(data, t(oldValue))
        } else {
          setField(data, t)
        }
      })

    }
    return getField(s())
  }
}

export function asAccessor<T, K extends (keyof T)>(v: T | Accessor<T>, k: K): Accessor<T[K]> {
  return () => {
    if (typeof(v) === "function") {
      return (v as Function)()[k]
    }
    return v[k]
  }
}

/**
 * Create a bucket to track data.
 * @param value value or Accessor of value
 * @param options options
 * @returns Bucket<T>
 */
export function bucket<T>(value: T | Accessor<T>, options?: {
  useValueAsAccessor?: boolean
  beforeUpdate?: (newValue: T) => void
  afterUpdate?: (newValue: T) => void
  localStorageName?: string;
} & SignalOptions<T>): Bucket<T> {
  if (options?.useValueAsAccessor && typeof(value) === "function") {
    const [_, others] = splitProps(options, ["useValueAsAccessor"])
    const memo = createMemo(() => bucket<T>((value as any)(), others))
    return (t) => {
      // @ts-ignore
      return memo()(t)
    }
  }
  
  const [local, others] = options && splitProps(options, ["beforeUpdate", "afterUpdate", "localStorageName"]) || [];

  // load from local storage
  if (local?.localStorageName) {
    const raw = localStorage.getItem(local.localStorageName);
    if (raw) {
      value = JSON.parse(raw);
    }
  }

  // @ts-ignore
  const [v, setV] = createSignal<T>(value, others)

  return (t) => {
    if (t !== undefined) {
      const newValue = setV((prev) => {
        local?.beforeUpdate?.(prev);
        if (typeof(t) === "function") {
          return (t as Function)(prev);
        } else {
          return t;
        }
      });
      // save to local storage
      if (local?.localStorageName) {
        localStorage.setItem(local.localStorageName, t ? JSON.stringify(t) : "");
      }
      local?.afterUpdate?.(newValue);
      return newValue;
    }
    return v()
  };
}
