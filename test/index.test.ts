import { ref, computed, watch, watchEffect } from '../src/index.js'

const a = ref(1)
const b = computed(() => a.value + 1)
const c = computed(() => {
  const d = computed(() => b.value + 1)
  return d.value
})

watch(c, () => {
  console.log(`ref 'c' changed: ${c.value}`)
})

watchEffect(() => {
  console.log(a.value, b.value, c.value)
})

a.value++
a.value++
