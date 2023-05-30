<template>
  <div class="flex flex-row justify-between mt-14">
    <div class="flex items-center">
      <nuxt-img
        src="/images/shukri.svg"
        :alt="t('global.shukri')"
        width="50"
        height="50"
      />
      <span class="text-white">
        © {{ new Date().getFullYear() }} {{ t('global.copyright') }}
      </span>
    </div>
    <div v-if="!error" class="flex gap-x-4">
      <span
        v-for="item in footerData"
        :id="`${item.socialNetwork.toLowerCase()}-${item.id}`"
      >
        <NuxtLink :to="item.link">
          <nuxt-img
            :src="`/images/icons/icons_${item.socialNetwork.toLowerCase()}_white.svg`"
            :alt="item.socialNetwork.toLowerCase()"
            width="30"
            height="30"
          />
        </NuxtLink>
      </span>
    </div>
  </div>
</template>
<script setup>
  import qs from 'qs'
  import { get } from '@vueuse/core'

  const { t } = useI18n()

  const query = computed(() =>
    qs.stringify(
      {
        populate: 'deep',
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    )
  )

  const { data: footerSeo, error } = await useCmsData(`seo?${get(query)}`, {
    cache: true,
  })

  const footerData = computed(
    () => get(footerSeo).data.attributes.seo.metaSocial
  )
</script>
