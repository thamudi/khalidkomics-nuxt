<template>
  <div class="footnote-container">
    <div class="flex flex-col items-center">
      <p class="py-4 px-6">{{ props.authorsNotes }}</p>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    authorsNotes: {
      type: String,
      default: '',
    },
  })
</script>
<style scoped lang="postcss">
  .footnote-container {
    @apply border-b-0;
  }
</style>
