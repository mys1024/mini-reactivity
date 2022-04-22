export interface Ref<T> {
  get value(): T
  set value(val: T)
}

export interface ComputedRef<T> {
  get value(): T
}

export type WatchAble<T> = Ref<T> | ComputedRef<T>
