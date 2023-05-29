<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ t('global.websiteTitle') }}</Title>
    </Head>
    <Body>
      <UiAppHeader />
      <div class="container md:px-0 bg-white">
        <slot />
      </div>
      <!-- <UiAppFooter /> -->
    </Body>
  </Html>
</template>

<script setup>
  const { t } = useI18n()
  const head = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true,
  })
</script>
