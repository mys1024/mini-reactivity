import type { ComputedRef } from './types.js'

import {
  Effect,
  pushActiveEffect,
  popActiveEffect,
  trackEffects,
} from './effect.js'

export class ComputedRefImpl<T> {
  _effect: Effect
  _value: T

  constructor(getter: () => T) {
    this._effect = new Effect(() => this._value = getter())
    pushActiveEffect(this._effect)
    this._value = getter()
    popActiveEffect()
  }

  get value() {
    trackEffects(this._effect)
    return this._value
  }

  get effect() {
    return this._effect
  }
}

export function computed<T>(getter: () => T): ComputedRef<T> {
  return new ComputedRefImpl(getter)
}
