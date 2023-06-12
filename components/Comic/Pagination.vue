<template>
  <div class="container my-4 lg:w-[50vw] lg:w-[35vw]">
    <div class="flex justify-evenly direction-ltr">
      <nuxt-img
        v-if="!props.comicPagination.page < props.comicPagination.pageCount"
        :src="`/images/pagination/arrow_previous_${locale}.svg`"
        alt="previous"
        width="125"
        height="500"
        class="lg:w-[160px] cursor-pointer"
        @click="$emit('changeComic', props.comicPagination.page + 1)"
      />

      <nuxt-img
        v-if="props.comicPagination.page !== 1"
        :src="`/images/pagination/arrow_next_${locale}.svg`"
        alt="next"
        width="125"
        height="500"
        class="lg:w-[160px] cursor-pointer"
        @click="$emit('changeComic', props.comicPagination.page - 1)"
      />
    </div>
  </div>
</template>
<script setup>
  const { locale } = useI18n()
  defineEmits(['changeComic'])
  const props = defineProps({
    comicPagination: {
      type: Object,
      default: () => {},
    },
  })
</script>
