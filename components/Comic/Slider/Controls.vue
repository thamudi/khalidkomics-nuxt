<script setup lang="ts">
  const swiper = useSwiper()
</script>

<template>
  <div class="hidden lg:block">
    <div
      class="swiper-button-prev swiper-button-styles"
      @click="swiper.slidePrev()"
    ></div>
    <div
      class="swiper-button-next swiper-button-styles"
      @click="swiper.slideNext()"
    ></div>
  </div>
</template>
<style scoped lang="postcss">
  .swiper-button-styles {
    @apply text-kk-blue;
  }
</style>
