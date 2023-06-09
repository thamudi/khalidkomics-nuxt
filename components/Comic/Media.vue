<template>
  <div v-if="imageFormats.includes(mediaFormat)">
    <nuxt-img
      :src="props.comic.attributes.url"
      :alt="props.comic.attributes.hash"
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
      <source :src="`https://${props.comic.attributes.url}`" />
    </video>
  </div>
</template>
<script setup>
  import { get } from '@vueuse/core'

  const mediaUrl = get(props.comic.attributes.url)
  const imageFormats = ['jpg', 'png', 'gif', 'jpeg', 'svg']
  const mediaFormat = mediaUrl.split('.')[mediaUrl.split('.').length - 1]
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
