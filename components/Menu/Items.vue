<template>
  <span v-for="(linkItem, index) in navItems" :id="index">
    <NuxtLink :to="linkItem.link">
      <div class="flex">
        <nuxt-img
          class="animate-wiggle my-3 md:my-auto md:mx-1 md:w-[100px]"
          :src="`/images/navigation/icons_${linkItem.label}_${locale}.svg`"
          :alt="t(`navigation.${linkItem.alt}`)"
          width="90"
          height="90"
        />
        <span class="hidden md:block mx-2">|</span>
      </div>
    </NuxtLink>
  </span>
</template>

<script setup>
  const { locale, t } = useI18n()

  const navItems = ref([
    {
      alt: 'home',
      link: '/',
      label: 'home',
    },
    {
      alt: 'archive comics',
      link: '/archive',
      label: 'archive',
    },
    {
      alt: 'about khalid komics',
      link: '/about',
      label: 'about',
    },
    {
      alt: 'contact khalid komics',
      link: '/contact',
      label: 'contact',
    },
    {
      alt: 'khalid komics store',
      link: 'https://khalidkomics.secure-decoration.com/',
      label: 'store',
    },
  ])
</script>
