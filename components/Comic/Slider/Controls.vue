<script setup lang="ts">
  const props = defineProps<{
    direction: 'prev' | 'next'
    swiper?: { prev: () => void; next: () => void } | null
  }>()

  const handleClick = () => {
    if (props.direction === 'prev') props.swiper?.prev()
    else props.swiper?.next()
  }
</script>

<template>
  <button :class="['nav-btn', `nav-btn--${direction}`]" @click="handleClick" />
</template>

<style scoped lang="postcss">
  .nav-btn {
    @apply text-kk-blue cursor-pointer flex-shrink-0;
    background: transparent;
    border: none;
    padding: 0.5rem;
    @apply hidden md:flex;
    align-items: center;
    justify-content: center;
  }

  .nav-btn::after {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-right: 3px solid currentColor;
    border-top: 3px solid currentColor;
  }

  .nav-btn--prev::after {
    transform: rotate(-135deg);
  }

  .nav-btn--next::after {
    transform: rotate(45deg);
  }

  [dir="rtl"] .nav-btn--prev::after {
    transform: rotate(45deg);
  }

  [dir="rtl"] .nav-btn--next::after {
    transform: rotate(-135deg);
  }
</style>
