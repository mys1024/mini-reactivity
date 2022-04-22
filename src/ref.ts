import type { Ref } from './types.js'

import {
  Effect,
  trackEffects,
} from './effect.js'

export class RefImpl<T> {
  _effect: Effect
  _value: T

  constructor(initialVal: T) {
    this._effect = new Effect()
    this._value = initialVal
  }

  get value() {
    trackEffects(this._effect)
    return this._value
  }

  set value(val) {
    this._value = val
    this._effect.trigger()
  }

  get effect() {
    return this._effect
  }
}

export function ref<T>(initialVal: T): Ref<T> {
  return new RefImpl(initialVal)
}
