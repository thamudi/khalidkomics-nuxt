<template>
  <div class="lg:w-3/5 relative lg:container">
    <UiSocialMedia />
  </div>
</template>

<script setup>
  const { t } = useI18n()

  useSeoMeta({
    title: () => `${t('global.websiteTitle')} - ${t('navigation.contact')}`,
    ogTitle: () => `${t('global.websiteTitle')} - ${t('navigation.contact')}`,
    twitterTitle: () =>
      `${t('global.websiteTitle')} - ${t('navigation.contact')}`,
    description: () =>
      `${t('navigation.contact')} ${t('global.websiteTitle')} ${t(
        'contact.title'
      )}`,
    ogDescription: () =>
      `${t('navigation.contact')} ${t('global.websiteTitle')} ${t(
        'contact.title'
      )}`,
    twitterDescription: () =>
      `${t('navigation.contact')} ${t('global.websiteTitle')} ${t(
        'contact.title'
      )}`,
  })
</script>
