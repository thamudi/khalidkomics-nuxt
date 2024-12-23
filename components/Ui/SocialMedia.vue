<template>
  <div class="flex flex-row justify-between mt-14">
    <div class="flex items-stretch">
      <nuxt-img
        width="300"
        height="300"
        alt="kk-thumbsup"
        src="/images/kk-thumbs-up.jpg"
      />
      <h2>{{ t('social.title') }}</h2>
    </div>
    <div v-if="!error" class="flex flex-col gap-x-4 justify-between">
      <span
        v-for="item in socialMediaData"
        :id="`${item.socialNetwork.toLowerCase()}-${item.id}`"
      >
        <NuxtLink :to="item.link">
          <nuxt-img
            :src="`/images/icons/${item.socialNetwork.toLowerCase()}.svg`"
            :alt="item.socialNetwork.toLowerCase()"
            width="80"
            height="80"
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

  const socialMediaData = computed(
    () => get(footerSeo).data.attributes.seo.metaSocial
  )
</script>
