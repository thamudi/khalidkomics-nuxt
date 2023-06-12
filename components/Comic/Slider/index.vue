<template>
  <ComicSearch />
  <div class="text-center flex justify-evenly">
    <h1 class="bold">{{ props.comic.title }}</h1>
    <span>{{ useDateFormatter(props.comic.releaseDate) }}</span>
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
    comic: {
      type: Object,
      default: () => {},
    },
  })

  const comicSlides = computed(() => {
    return props.comic.comic.data ? props.comic.comic.data : props.comic.comic
  })
</script>

<style scoped lang="postcss">
  .swiper-creative {
    @apply lg:w-[500px];
    @apply lg:h-[500px];
  }
  .swiper-slide {
    @apply lg:w-[500px];
    @apply lg:h-[550px];
  }
</style>
