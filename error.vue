<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ 404 }} - {{ t('global.websiteTitle') }}</Title>
    </Head>
    <Body>
      <UiAppHeader />
      <div class="mt-24 container px-12 lg:w-1/2 lg:mx-auto h-[68vh]">
        <div class="__nuxt-error-page">
          <div class="flex flex-col gap-y-4 lg:gap-y-8">
            <h1 class="font-bold">{{ t('global.404.title') }}</h1>
            <p>{{ t('global.404.paragraph_1') }}</p>
            <p>{{ t('global.404.paragraph_2') }}</p>
            <div class="flex justify-between w-full">
              <span
                v-for="(linkItem, index) in navItems"
                :id="`404-nav-items-${index}`"
              >
                <NuxtLink
                  :to="`${linkItem.link}`"
                  class="capitalize text-kk-blue text-lg"
                >
                  {{ t(`navigation.${linkItem.label}`) }}
                </NuxtLink>
              </span>
            </div>
            <div class="flex justify-end mt-8">
              <nuxt-img
                src="/images/404.svg"
                alt="404 empty cup"
                width="150"
                height="150"
              />
            </div>
          </div>
        </div>
      </div>
      <UiAppFooter />
    </Body>
  </Html>
</template>

<script setup>
  const { t, locales, locale } = useI18n()

  const head = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true,
  })

  const navItems = ref([
    {
      link: `/`,
      label: 'home',
    },
    {
      link: `/archive`,
      label: 'archive',
    },
    {
      link: `/about`,
      label: 'about',
    },
    {
      link: `/contact`,
      label: 'contact',
    },
    {
      link: 'https://khalidkomics.secure-decoration.com/',
      label: 'store',
    },
  ])
</script>

<style lang="postcss" scoped></style>
