<template>
  <div class="flex justify-between">
    <span v-for="(linkItem, index) in navItems" :id="`footer-${index}`">
      <NuxtLink :to="linkItem.link" class="capitalize text-white text-lg">
        {{ t(`footer.${linkItem.label}`) }}
      </NuxtLink>
    </span>
  </div>
</template>
<script setup>
  const { t } = useI18n()
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
