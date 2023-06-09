<template>
  <div class="text-center flex justify-evenly mt-10">
    <h1 class="bold">{{ props.comics.title }}</h1>
    <span>{{ useDateFormatter(props.comics.releaseDate) }}</span>
  </div>
  <ClientOnly>
    <Swiper
      :modules="[SwiperEffectCreative, SwiperThumbs, SwiperPagination]"
      :slides-per-view="1"
      :loop="false"
      :effect="'creative'"
      :pagination="{
        clickable: true,
        enabled: true,
        dynamicBullets: true,
      }"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide v-for="(slide, idx) in comicSlides" :key="idx">
        <ComicMedia :comic="slide" />
      </SwiperSlide>
      <ComicSliderControls />
    </Swiper>
  </ClientOnly>
</template>

<script setup>
  const props = defineProps({
    comics: {
      type: Object,
      default: () => {},
    },
  })

  const comicSlides = computed(() => {
    return props.comics.comic.data
      ? props.comics.comic.data
      : props.comics.comic
  })
</script>

<style scoped lang="postcss">
  .swiper-creative {
    @apply md:w-[500px];
    @apply md:h-[500px];
  }
  .swiper-slide {
    @apply md:w-[500px];
    @apply md:h-[550px];
  }
</style>
