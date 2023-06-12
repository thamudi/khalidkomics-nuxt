<template>
  <div class="container">
    <h1 class="text-center font-bold mt-4">
      <span class="capitalize">
        {{ t('footer.archive') }}
      </span>
      > {{ $route.params.slug }}
    </h1>
    <ComicSearch
      text="search.alternative-placeholder"
      :value="route.params.slug"
    />
    <GlobalSort
      :sort-order="currentSortOrder"
      @change-sort-order="setSortOrder"
    />
    <div v-if="!pending && !error">
      <div class="comics-list-container">
        <div
          v-for="(comic, idx) in archiveList.data"
          :key="`${comic.id}-${idx}`"
        >
          <NuxtLink
            :to="`/comic/${comic.attributes.archive.data.attributes.title}/${comic.id}`"
            class="flex items-center m-4 p-4"
          >
            <nuxt-img
              width="100"
              height="100"
              class="thumbnail"
              :alt="comic.attributes.title"
              :src="comic.attributes.thumbnail.data.attributes.url"
            />
            <div>
              <h3 class="font-bold">
                {{ comic.attributes.title }}
              </h3>
              <span class="text-gray-400">
                {{ useDateFormatter(comic.attributes.releaseDate) }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <GlobalPagination
        v-if="pagination.total > 5"
        :current-page="pagination.currentPage"
        :page-count="pagination.pageCount"
        @change-page="setPage"
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
  const { locale, t } = useI18n()
  const route = useRoute()
  const currentPage = useState('archiveCurrentPage', () => 1)
  const currentSortOrder = useState('archiveSortOrder', () => 'desc')
  const setPage = (newPage) => set(currentPage, newPage)
  const setSortOrder = (newOrder) => set(currentSortOrder, newOrder)

  const query = computed(() =>
    qs.stringify(
      {
        populate: '*',
        sort: [`releaseDate:${get(currentSortOrder)}`],
        filters: {
          keywords: {
            $contains: route.query.q,
          },
          archive: {
            slug: {
              $eq: route.params.slug,
            },
          },
        },
        pagination: {
          pageSize: 5,
          page: get(currentPage),
        },
        locale: get(locale),
      },
      {
        encodeValuesOnly: true,
      }
    )
  )

  const {
    data: archiveList,
    error,
    pending,
  } = await useAsyncData(
    'comics',
    () => {
      return $cms(`comics?${get(query)}`, { cache: true })
    },
    {
      watch: [query],
    }
  )

  const pagination = computed(() => {
    return {
      currentPage: get(archiveList).meta.pagination.page,
      pageCount: get(archiveList).meta.pagination.pageCount,
      total: get(archiveList).meta.pagination.total,
    }
  })

  watchEffect(async () => {
    setPage(1)
  })
</script>
<style scoped lang="postcss">
  .comics-list-container {
    @apply flex flex-col w-full;
    @apply lg:w-fit lg:grid lg:grid-cols-3 lg:gap-4 lg:mx-4;
  }

  .thumbnail {
    @apply object-cover mr-5;
    @apply lg:w-40;
  }
</style>
