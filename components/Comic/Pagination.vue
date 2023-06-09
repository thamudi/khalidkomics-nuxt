<template>
  <div class="container my-4 md:w-[50vw] lg:w-[35vw]">
    <div class="flex justify-evenly direction-ltr">
      <nuxt-img
        v-if="!props.comicsPagination.page < props.comicsPagination.pageCount"
        :src="`/images/pagination/icons_arrow_previous_${locale}.svg`"
        alt="previous"
        width="125"
        height="500"
        class="md:w-[160px] cursor-pointer"
        @click="$emit('changeComic', props.comicsPagination.page + 1)"
      />

      <nuxt-img
        v-if="props.comicsPagination.page !== 1"
        :src="`/images/pagination/icons_arrow_next_${locale}.svg`"
        alt="next"
        width="125"
        height="500"
        class="md:w-[160px] cursor-pointer"
        @click="$emit('changeComic', props.comicsPagination.page - 1)"
      />
    </div>
  </div>
</template>
<script setup>
  const { locale } = useI18n()
  defineEmits(['changeComic'])
  const props = defineProps({
    comicsPagination: {
      type: Object,
      default: () => {},
    },
  })
</script>
