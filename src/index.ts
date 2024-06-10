
export * from "./arrayHelpers"
export * from "./buckets"
export * from "./checks"
export * from "./converters"
export * from "./generators"
export * from "./others"
export * from "./wrappers"
export * from "./conditionals"

declare global {
  
  type Pair<K, V> = [key: K, value: V]

  type Consumer<T> = (v: T) => void

  type BiConsumer<A, B> = (a: A, b: B) => void

  type TriConsumer<A, B, C> = (a: A, b: B, c: C) => void

  type Func<T, R> = (v: T) => R

  type BiFunc<A, B, R> = (a: A, b: B) => R

  type Callback = (...args: any) => any

  type Supplier<T> = () => T
  
  type Comparator<T> = (a: T, b: T) => -1 | 0 | 1

  type ObjectIndex = string | number

  interface Mapper<A, B> {
    to?(a: A): B;
    from?(b: B): A;
  }

  type Bucket<T> = {
    // (v?: T): T;
    // (v: (prev: T) => T): T;
    <U extends T>(v?: T): U;
    <U extends T>(v: (prev: T) => U): U;
  }

  type StampedBucket<T> = ((updater?: Consumer<T>) => T) & StampedBucketAction<T>;

  interface StampedBucketAction<T> {
    map<O>(call: (v: T) => O): O
    markChanged(): void
    reset(v: T): void
  }

  interface StampedData<T> {
    data: T
    timestamp: number
  }
}