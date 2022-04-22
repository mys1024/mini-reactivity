const activeEffectStack: Effect[] = []

export class Effect {
  upperEffects: Set<Effect> = new Set()
  lowerEffects: Set<Effect> = new Set()
  priorLowerEffects: Set<Effect> = new Set()
  fn?: () => void
  prior: boolean

  constructor(fn?: () => void, priority = false) {
    this.fn = fn
    this.prior = priority
  }

  trigger() {
    // breadth first
    const effectQueue: Effect[] = [this]
    while (effectQueue.length > 0) {
      const effect = effectQueue.shift() as Effect
      effect.fn?.()
      effectQueue.push(...effect.priorLowerEffects)
      effectQueue.push(...effect.lowerEffects)
    }
  }
}

export function getActiveEffect() {
  const top = activeEffectStack.length - 1
  return top >= 0 ? activeEffectStack[top] : null
}

export function pushActiveEffect(effect: Effect) {
  activeEffectStack.push(effect)
}

export function popActiveEffect() {
  activeEffectStack.pop()
}

export function trackEffects(effect: Effect) {
  const activeEffect = getActiveEffect()

  if (activeEffect == null || activeEffect.upperEffects.has(effect))
    return

  activeEffect.upperEffects.add(effect)
  if (activeEffect.prior)
    effect.priorLowerEffects.add(activeEffect)
  else
    effect.lowerEffects.add(activeEffect)
}
