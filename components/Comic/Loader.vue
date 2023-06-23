<template>
  <div class="h-[70vh] container flex items-center justify-center">
    <nuxt-img
      v-if="!timeout"
      src="/images/loading-surf.gif"
      alt="loading"
      width="250"
      height="250"
    />
    <nuxt-img
      format="webp"
      v-else
      src="/images/fail.jpg"
      alt="loading"
      width="250"
      height="250"
    />
  </div>
</template>
<script setup>
  import { set } from '@vueuse/core'

  const timeout = ref(false)

  setTimeout(() => {
    set(timeout, true)
  }, 5000)
</script>
