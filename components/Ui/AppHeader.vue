<template>
  <header class="header">
    <div class="container">
      <div class="flex justify-between items-center md:justify-center">
        <NuxtLink :to="localePath('/')">
          <nuxt-img
            class="my-4 md:w-[350px]"
            src="/logos/site_icons_logo_full_white.svg"
            :alt="t('global.websiteTitle')"
            width="200"
            height="200"
          />
        </NuxtLink>

        <UiMenuIcon :is-open="isOpen" @toggle-menu="toggleMenu" />
      </div>
      <MenuNavBar :class="isOpen ? 'flex' : 'hidden'" class="w-full md:flex" />
    </div>
  </header>
</template>

<script setup>
  import { ref } from 'vue'
  import { set } from '@vueuse/core'
  const { t } = useI18n()
  const localePath = useLocalePath()

  const isOpen = ref(false)

  const toggleMenu = () => {
    set(isOpen, !isOpen.value)
  }
</script>

<style lang="postcss" scoped>
  .header {
    @apply border-b-kk-blue-dark border-solid border-b-[6px];
    @apply bg-kk-blue bg-kk-tile-transparent;
    background-size: 10px;
  }
</style>
