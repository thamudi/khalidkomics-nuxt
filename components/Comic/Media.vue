<template>
  <div v-if="imageFormats.includes(mediaFormat)">
    <nuxt-img
      format="webp"
      width="500"
      height="600"
      :src="fullUrl"
      :alt="mediaObject.hash"
    />
  </div>
  <div v-else>
    <video
      loop
      autoPlay
      muted
      :key="props.comic.id"
      @click="toggleMute"
      ref="video"
      class="mb-4 cursor-pointer w-[500px] h-[500px]"
    >
      <source :src="`${fullUrl}`" />
    </video>
  </div>
</template>
<script setup>
  import { get } from '@vueuse/core'

  const mediaObject = get(
    props.comic.attributes ? props.comic.attributes : props.comic
  )

  /**
   * TODO: Remove this when the issue is resolved on Strapi CMS
   *
   * The issue that some URLs have not HTTPS prefix which causes the images to be broken
   */
  const fullUrl = /^https/.test(mediaObject.url)
    ? mediaObject.url
    : `https://${mediaObject.url}`

  const imageFormats = ['jpg', 'png', 'gif', 'jpeg', 'svg']
  const mediaFormat =
    mediaObject.url.split('.')[mediaObject.url.split('.').length - 1]
  const video = ref(null)

  const props = defineProps({
    comic: {
      type: Object,
      default: () => {},
    },
  })

  const toggleMute = () => {
    video.value.defaultMuted = !video.value.defaultMuted
    video.value.muted = !video.value.muted
  }
</script>
