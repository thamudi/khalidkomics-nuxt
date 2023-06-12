<template>
  <nav>
    <!-- Main Menu -->
    <MenuItems />
    <!-- Language Switcher -->
    <MenuLanguageSwitcher />
  </nav>
</template>

<style lang="postcss" scoped>
  nav {
    @apply flex-col flex-wrap content-center m-auto;
    @apply lg:flex-row lg:justify-center lg:items-center lg:mb-4;
    @apply lg:bg-kk-blue-light rounded-3xl;
  }
</style>
