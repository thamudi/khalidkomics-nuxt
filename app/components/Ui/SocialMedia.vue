<template>
  <div class="flex lg:flex-row flex-col justify-between mt-14">
    <div class="flex flex-col-reverse lg:flex-row items-stretch">
      <nuxt-img
        width="300"
        height="300"
        alt="kk-thumbsup"
        src="/images/kk-thumbs-up.jpg"
      />
      <h1 class="text-center">{{ t('social.title') }}</h1>
    </div>
    <div v-if="!error" class="flex lg:flex-col gap-x-4 justify-between">
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
