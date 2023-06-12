<template>
  <div :class="`flex flex-col justify-start border-2 p-4 mx-auto mt-4 ${type}`">
    <div class="flex flex-col">
      <div class="flex flex-row justify-between items-center mb-2">
        <div class="flex flex-col">
          <p class="font-bold first-letter:uppercase">{{ type }}</p>

          <p>{{ t(message) }}</p>
        </div>
        <div class="flex flex-row gap-x-4 align-top">
          <nuxt-img
            :src="`/images/contact/${type}.svg`"
            :alt="`${type}`"
            width="120"
            height="120"
          />
          <i class="cursor-pointer text-2xl" @click=""> x </i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const { t } = useI18n()
  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
  })
</script>
<style scoped lang="postcss">
  .success {
    background-color: rgba(109, 185, 129, 0.1);
    border-color: #6db981;
    color: #6db981;
  }
  .error {
    background-color: rgba(242, 111, 84, 0.1);
    border-color: #f26f54;
    color: #f26f54;
  }
  .info {
    background-color: rgba(11, 150, 171, 0.1);
    @apply border-kk-blue;
    color: #0b96ab;
  }
</style>
