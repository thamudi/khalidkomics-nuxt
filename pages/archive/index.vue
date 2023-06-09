<template>
  <div class="container">
    <h1 class="text-center font-bold mt-4">
      {{ t('global.archive-title') }}
    </h1>
    <div
      v-if="!pending && !error"
      class="grid grid-cols-2 gap-4 w-fit mx-auto my-4"
    >
      <div v-for="(archive, idx) in archivesData" :key="`${archive}-${idx}`">
        <NuxtLink :to="`/archive/${archive.attributes.slug}`">
          <div class="overlay">
            <span class="overlay-title">
              {{ archive.attributes.slug }}
            </span>
          </div>
          <nuxt-img
            class="overlay-rounded-corners"
            :src="archive.attributes.thumbnail.data.attributes.url"
            :alt="archive.attributes.slug"
            width="135"
            heigh="135"
          />
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      <ComicLoader />
    </div>
  </div>
</template>
<script setup>
  import qs from 'qs'
  const { locale, t } = useI18n()
  import { get, set } from '@vueuse/core'

  const query = computed(() =>
    qs.stringify(
      {
        populate: '*',
        sort: ['title:desc'],
        locale: get(locale),
      },
      {
        encodeValuesOnly: true,
      }
    )
  )

  const {
    data: archives,
    error,
    pending,
  } = await useAsyncData(
    'archives',
    () => {
      return $cms(`archives?${get(query)}`, { cache: true })
    },
    {
      server: false,
      watch: [query],
    }
  )

  const archivesData = computed(() => get(archives).data)
</script>
<style scoped lang="postcss">
  .overlay {
    @apply absolute z-10 rounded-2xl bg-[#0000008c];
    @apply w-[135px] h-[135px];
  }

  .overlay-title {
    @apply flex justify-center items-center;
    @apply h-full;
    @apply text-white font-bold;
    @apply text-4xl;
  }
  .overlay-rounded-corners {
    @apply rounded-2xl;
  }
</style>
