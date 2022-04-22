import {
  Effect,
  pushActiveEffect,
  popActiveEffect,
} from './effect.js'

export function watchEffect(callback: () => void) {
  const effect = new Effect(callback, true)
  pushActiveEffect(effect)
  callback()
  popActiveEffect()
}
