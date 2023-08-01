<template>
  <h1 class="text-center font-bold mt-4">
    <span class="capitalize">
      {{ t(`navigation.${route.params.slug}`) }}
    </span>
  </h1>
  <ComicSearch
    text="search.alternative-placeholder"
    :value="t(`navigation.${route.params.slug}`)"
  />
  <GlobalSort
    :sort-order="currentSortOrder"
    @change-sort-order="setSortOrder"
  />
  <div v-if="!pending && !error">
    <div class="comics-list-container">
      <div
        v-for="(comic, idx) in categoriesList.data"
        :key="`${comic.id}-${idx}`"
      >
        <NuxtLink
          :to="`/categories/${route.params.slug}/${comic.id}`"
          class="flex items-center m-4 p-4"
        >
          <nuxt-img
            format="webp"
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
</template>
<script setup>
  import qs from 'qs'
  import { get, set } from '@vueuse/core'
  const route = useRoute()
  const { locale, t } = useI18n()
  const currentPage = useState('categoriesCurrentPage', () => 1)
  const currentSortOrder = useState('categoriesSortOrder', () => 'desc')
  const setPage = (newPage) => set(currentPage, newPage)
  const setSortOrder = (newOrder) => set(currentSortOrder, newOrder)
  const query = computed(() =>
    qs.stringify(
      {
        populate: '*',
        sort: [`releaseDate:${get(currentSortOrder)}`],
        filters: {
          category: {
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
    data: categoriesList,
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
      currentPage: get(categoriesList).meta.pagination.page,
      pageCount: get(categoriesList).meta.pagination.pageCount,
      total: get(categoriesList).meta.pagination.total,
    }
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
