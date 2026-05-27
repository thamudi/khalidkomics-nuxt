<template>
  <span v-for="(linkItem, index) in navItems" :id="`nav-items-${index}`">
    <NuxtLink :to="linkItem.link">
      <span class="flex">
        <nuxt-img
          class="animate-wiggle my-3 md:my-auto md:mx-1 md:w-[100px]"
          :src="`/images/navigation/${linkItem.label}_${locale}.svg`"
          :alt="t(`navigation.${linkItem.label}`)"
          width="90"
          height="90"
        />
        <span class="hidden md:block mx-2">|</span>
      </span>
    </NuxtLink>
  </span>
</template>

<script setup>
  const { locale, t } = useI18n()

  const navItems = ref([
    {
      link: '/',
      label: 'home',
    },
    {
      link: '/archive',
      label: 'archive',
    },
    {
      link: '/categories/fanzeen',
      label: 'fanzeen',
    },
 /**   {
      link: '/categories/graphic-novels',
      label: 'graphic-novels',
    }, **/
    {
      link: '/about',
      label: 'about',
    },
    {
      link: '/contact',
      label: 'contact',
    },
    {
      link: 'https://khalidkomics.secure-decoration.com/',
      label: 'store',
    },
  ])
</script>
