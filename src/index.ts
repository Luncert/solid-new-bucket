
export * from "./arrayHelpers"
export * from "./buckets"
export * from "./checks"
export * from "./converters"
export * from "./generators"
export * from "./others"
export * from "./wrappers"
export * from "./conditionals"
  
export type Pair<K, V> = [key: K, value: V]

export type Consumer<T> = (v: T) => void

export type BiConsumer<A, B> = (a: A, b: B) => void

export type TriConsumer<A, B, C> = (a: A, b: B, c: C) => void

export type Func<T, R> = (v: T) => R

export type BiFunc<A, B, R> = (a: A, b: B) => R

export type Callback = (...args: any) => any

export type Supplier<T> = () => T
  
export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1

export type ObjectIndex = string | number

export interface Mapper<A, B> {
  to?(a: A): B;
  from?(b: B): A;
}

export type Bucket<T> = {
  // (v?: T): T;
  // (v: (prev: T) => T): T;
  <U extends T>(v?: T): U;
  <U extends T>(v: (prev: T) => U): U;
}

export type StampedBucket<T> = ((updater?: Consumer<T>) => T) & StampedBucketAction<T>;

interface StampedBucketAction<T> {
  map<O>(call: (v: T) => O): O
  markChanged(): void
  reset(v: T): void
}

export interface StampedData<T> {
  data: T
  timestamp: number
}