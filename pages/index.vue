<template>
  <div v-if="!pending && !error">
    <ComicSlider :comic="comicsData" />
    <ComicPagination
      :comic-pagination="comicPaginationData"
      @change-comic="setPage"
    />
    <ComicNotes
      v-if="comicsData.authorsNote"
      :authors-notes="comicsData.authorsNote"
    />
    <ComicShare :comic-url="comicUrl" />
  </div>
  <div v-else>
    <ComicLoader />
  </div>
</template>

<script setup>
  import qs from 'qs'
  import { get, set } from '@vueuse/core'
  const { locale } = useI18n()
  const currentPage = useState('comicsCurrentPage', () => 1)

  const setPage = (newPage) => {
    if (newPage <= get(comicPaginationData).total) set(currentPage, newPage)
  }

  const query = computed(() =>
    qs.stringify(
      {
        populate: '*',
        sort: ['releaseDate:desc'],
        pagination: {
          page: get(currentPage),
          pageSize: 1,
        },
        locale: get(locale),
      },
      {
        encodeValuesOnly: true,
      }
    )
  )

  const seoQuery = computed(() =>
    qs.stringify({
      populate: 'deep',
    })
  )

  const {
    data: comics,
    error,
    pending,
  } = await useAsyncData(
    'comics',
    () => {
      return $cms(`comics?${get(query)}`, { cache: true })
    },
    {
      server: false,
      watch: [query],
    }
  )

  const { data: seoData, error: seoError } = useCmsData(`seo?${get(seoQuery)}`)

  const comicsData = computed(() => get(comics).data[0].attributes)
  const comicUrl = computed(
    () =>
      `${get(comicsData).archive.data.attributes.slug}/${
        get(comics).data[0].id
      }`
  )

  const { seoTitle, seoImage, seoDescription } = useSeo(seoData)

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

  const comicPaginationData = computed(() => {
    return {
      page: get(comics).meta.pagination.page,
      pageCount: get(comics).meta.pagination.pageCount,
      total: get(comics).meta.pagination.total,
    }
  })
</script>
