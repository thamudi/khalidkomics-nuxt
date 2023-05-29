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
    @apply md:flex-row md:justify-center md:items-center md:mb-4;
    @apply md:bg-kk-blue-light rounded-3xl;
  }
</style>
