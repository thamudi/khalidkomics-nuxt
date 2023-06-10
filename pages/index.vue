<template>
  <div class="container">
    <div v-if="!pending && !error">
      <ComicSlider :comic="comicsData" />
      <ComicPagination
        :comic-pagination="comicPaginationData"
        @change-comic="setPage"
      />
    </div>
    <div v-else>
      <ComicLoader />
    </div>
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

  const comicsData = computed(() => get(comics).data[0].attributes)

  const comicPaginationData = computed(() => {
    return {
      page: get(comics).meta.pagination.page,
      pageCount: get(comics).meta.pagination.pageCount,
      total: get(comics).meta.pagination.total,
    }
  })
</script>
