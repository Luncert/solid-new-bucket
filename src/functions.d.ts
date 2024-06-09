
export {}

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
}