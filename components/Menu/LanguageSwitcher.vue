<template>
  <NuxtLink
    v-for="localeItem in availableLocales"
    :key="localeItem.code"
    :to="switchLocalePath(localeItem.code)"
    :class="localeItem.code"
  >
    <nuxt-img
      class="animate-wiggle"
      :src="`/images/icons/lang_${localeItem.code}.svg`"
      :alt="localeItem.name"
      width="80"
      height="80"
    />
  </NuxtLink>
</template>

<script setup>
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const availableLocales = computed(() => {
    return locales.value.filter((i) => i.code !== locale.value)
  })
</script>
