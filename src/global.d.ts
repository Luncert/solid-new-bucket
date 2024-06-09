
export { }

declare global {

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

  interface StampedBucketAction<T> {
    map<O>(call: (v: T) => O): O
    markChanged(): void
    reset(v: T): void
  }

  type StampedBucket<T> = ((updater?: Consumer<T>) => T) & StampedBucketAction<T>;

  interface StampedData<T> {
    data: T
    timestamp: number
  }
}
