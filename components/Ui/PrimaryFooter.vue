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
  const { locale, t } = useI18n()
  const navItems = ref([
    {
      link: `/${locale.value}`,
      label: 'home',
    },
    {
      link: `/${locale.value}/archive`,
      label: 'archive',
    },
    {
      link: `/${locale.value}/about`,
      label: 'about',
    },
    {
      link: `/${locale.value}/contact`,
      label: 'contact',
    },
    {
      link: 'https://khalidkomics.secure-decoration.com/',
      label: 'store',
    },
  ])
</script>
