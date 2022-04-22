import type { WatchAble } from './types.js'

import { Effect } from './effect.js'
import { RefImpl } from './ref.js'
import { ComputedRefImpl } from './computed.js'

export function watch<T>(watchAble: WatchAble<T>, callback: () => void) {
  let effect: Effect | undefined
  if (watchAble instanceof RefImpl)
    effect = watchAble._effect
  if (watchAble instanceof ComputedRefImpl)
    effect = watchAble._effect
  if (!effect)
    throw new Error(`${watchAble} isn't WatchAble`)
  const watcherEffect = new Effect(callback, true)
  effect.lowerEffects.add(watcherEffect)
  watcherEffect.upperEffects.add(effect)
}
