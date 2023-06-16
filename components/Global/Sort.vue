<template>
  <div class="w-full flex flex-row-reverse">
    <nuxt-img
      :src="`/images/icons/sort_${props.sortOrder}.svg`"
      :alt="props.sortOrder"
      width="30"
      height="30"
      @click="emitChangeSort"
      class="cursor-pointer"
    />
  </div>
</template>
<script setup>
  import { get } from '@vueuse/core'
  const emit = defineEmits(['changeSortOrder'])
  const props = defineProps({
    sortOrder: {
      type: String,
      default: 'desc',
    },
  })

  const emitChangeSort = () => {
    get(props.sortOrder) === 'desc'
      ? emit('changeSortOrder', 'asc')
      : emit('changeSortOrder', 'desc')
  }
</script>
<style scoped lang="postcss"></style>
