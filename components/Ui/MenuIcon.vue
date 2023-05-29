<template>
  <div class="block md:hidden">
    <nuxt-img
      class="animate-wiggle"
      src="/images/icons/hamburger.svg"
      :alt="t('navigation.burger-menu')"
      width="45"
      height="45"
      @click="$emit('toggle-menu')"
    />
  </div>
</template>

<script setup>
  defineEmits(['toggle-menu'])
  const { t } = useI18n()
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
  })
</script>

<style lang="postcss" scoped></style>
