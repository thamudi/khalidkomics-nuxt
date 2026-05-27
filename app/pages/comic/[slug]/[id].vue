<template>
  <div v-if="!pending && !error">
    <ComicSlider :comic="comicData" />
    <ComicNotes
      v-if="comicData.authorsNote"
      :authors-notes="comicData.authorsNote"
    />
    <ComicShare :comic-url="`${comicUrl}`" />
  </div>
  <div v-else>
    <ComicLoader />
  </div>
</template>
<script setup>
  import qs from 'qs'
  import { get } from '@vueuse/core'
  const route = useRoute()
  const router = useRouter()
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const query = computed(() =>
    qs.stringify(
      {
        populate: '*',
        filters: {
          archive: {
            slug: {
              $eq: route.params.slug,
            },
          },
        },
        locale: get(locale),
      },
      {
        encodeValuesOnly: true,
      }
    )
  )

  const {
    data: comic,
    error,
    pending,
  } = await useCmsData(`comics/${route.params.id}?${get(query)}`, {
    cache: true,
    client: false,
  })

  const comicData = computed(() =>
    get(comic).data.length
      ? get(comic).data[0].attributes
      : get(comic).data.attributes
  )
  const comicUrl = computed(
    () => `${get(comicData).archive.slug}/${get(comicData).id}`
  )

  const { seoTitle, seoDescription, seoImage } = useComicSeo(comicData)

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

  watch(locale, async () => {
    const comicTranslation = get(comicData)?.localizations
    if (comicTranslation.length) {
      router.push(
        localePath(`/comic/${route.params.slug}/${comicTranslation[0].id}`)
      )
    } else {
      router.push(localePath('/'))
    }
  })
</script>
<style scoped lang="postcss"></style>
