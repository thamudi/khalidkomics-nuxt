<template>
  <dialog
    ref="dialog"
    :class="`${type} p-8 rounded-[40px] border-4 border-kk-blue-dark max-w-[90%] w-full lg:max-w-[50%]`"
  >
    <div class="flex flex-col justify-between items-center mb-2">
      <p>{{ t(message) }}</p>
      <div class="flex flex-row gap-x-4 align-top">
        <nuxt-img
          :src="`/images/contact/${type}.svg`"
          :alt="`${type}`"
          width="150"
          height="150"
        />
      </div>
    </div>
    <form method="dialog">
      <button
        @click="$emit('closeDialog')"
        class="my-4 px-4 border-2 solid border-wi border-kk-black hover:bg-kk-blue hover:text-kk-blue-light"
      >
        {{ t('ok') }}
      </button>
    </form>
  </dialog>
</template>
<script setup>
  defineEmits(['closeDialog'])
  const { t } = useI18n()
  const dialog = ref(null)
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
  onMounted(() => dialog.value.showModal())
</script>
<style scoped lang="postcss">
  .success {
    /* background-color: rgba(109, 185, 129); */
    border-color: #6db981;
    color: #6db981;
  }
  .error {
    /* background-color: rgba(242, 111, 84); */
    border-color: #f26f54;
    color: #f26f54;
  }
  .info {
    /* background-color: rgba(11, 150, 171); */
    @apply border-kk-blue;
    color: #0b96ab;
  }
</style>
