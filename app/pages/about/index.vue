<template>
  <div v-if="!pending && !error">
    <div class="subPage">
      <h1 class="text-center font-bold mt-4">
        {{ aboutData.AboutTitle }}
      </h1>
      <div class="wrapper">
        <nuxt-img
          width="500"
          height="600"
          :alt="aboutData.AboutTitle"
          :src="imageBanner"
        />
        <div
          id="authorBlurb"
          class="flex w-full flex-col justify-around"
          v-html="aboutData.Content"
        ></div>
      </div>
    </div>
  </div>
  <div v-else>
    <ComicLoader />
  </div>
</template>
<script setup>
  import qs from 'qs'
  import { get } from '@vueuse/core'
  const { locale, t } = useI18n()
  const query = computed(() =>
    qs.stringify(
      {
        populate: 'deep',
        locale: get(locale),
      },
      {
        encodeValuesOnly: true,
      }
    )
  )
  const { data, pending, error } = await useCmsData(`about?${get(query)}`, {
    cache: true,
  })

  const aboutData = computed(() => get(data).data.attributes)
  const imageBanner = computed(
    () => get(aboutData).ImageBanner.data.attributes.url
  )

  const { seoTitle, seoImage, seoDescription } = useSeo(get(data))

  useSeoMeta({
    title: () => get(seoTitle),
    ogTitle: () => get(seoTitle),
    twitterTitle: () => get(seoTitle),
    description: () => get(seoDescription),
    ogDescription: () => get(seoDescription),
    twitterDescription: () => get(seoDescription),
    ogImage: () => get(seoImage),
    twitterImage: () => get(seoImage),
  })
</script>
<style scoped lang="postcss">
  .subPage {
    @apply m-auto mb-3;
    @apply p-3 pt-0;
    /* @apply outline; */
    @apply border-b-[3px] border-kk-blue-dark max-w-[98%] w-[1000px];
  }

  .subPage .wrapper {
    @apply lg:flex lg:flex-row;
  }
</style>
