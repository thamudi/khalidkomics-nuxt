<template>
  <Head>
    <Title>{{ t('global.websiteTitle') }}</Title>
  </Head>
  <UiAppHeader />
  <div class="container lg:px-0 bg-white">
    <slot />
  </div>
  <UiAppFooter />
</template>

<script setup>
  const { t } = useI18n()
  const head = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true,
  })
  useHead(head)
</script>
