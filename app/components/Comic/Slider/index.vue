<template>
  <ComicSearch />
  <div class="text-center flex justify-evenly">
    <h1 class="bold">{{ props.comic.title }}</h1>
    <span>{{ useDateFormatter(props.comic.releaseDate) }}</span>
  </div>
  <ClientOnly>
    <div class="flex items-center gap-2 w-fit mx-auto">
      <ComicSliderControls direction="prev" :swiper="swiper" />
      <swiper-container ref="swiperRef" :init="false">
        <swiper-slide v-for="(slide, idx) in comicSlides" :key="idx">
          <ComicMedia :comic="slide" />
        </swiper-slide>
      </swiper-container>
      <ComicSliderControls direction="next" :swiper="swiper" />
    </div>
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

  const swiperRef = ref(null)
  const swiper = useSwiper(swiperRef, {
    slidesPerView: 1,
    zoom: true,
    loop: false,
    effect: 'creative',
    pagination: {
      clickable: true,
      enabled: true,
      dynamicBullets: true,
    },
    creativeEffect: {
      prev: { shadow: false, translate: ['-2%', 0, -1] },
      next: { translate: ['100%', 0, 0] },
    },
  })
</script>

<style>
  swiper-container {
    display: block;
    width: min(500px, calc(100vw - 8rem));
  }

  swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
