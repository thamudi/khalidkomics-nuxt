<template>
  <dialog ref="dialog" class="p-8 rounded-[40px] border-4 border-kk-blue-dark">
    <p class="text-kk-blue-dark">{{ t(message) }}</p>
    <form method="dialog">
      <button
        class="my-4 px-4 border-2 solid border-wi border-kk-black hover:bg-kk-blue hover:text-kk-blue-light"
      >
        {{ t('ok') }}
      </button>
    </form>
  </dialog>

  <div class="share-container">
    <div class="flex flex-col items-center">
      <div class="share-links">
        <div>
          <nuxt-img
            width="60"
            height="60"
            alt="copy-link"
            src="/images/icons/copy_link.svg"
            @click="() => copyToClipboard()"
          />
        </div>
        <div>
          <nuxt-img
            width="60"
            height="60"
            alt="native-share"
            src="/images/icons/share.svg"
            @click="() => shareTo()"
          />
        </div>
        <!-- <div>
          <nuxt-img
            width="60"
            height="60"
            alt="facebook-share"
            src="/images/icons/facebook.svg"
            @click="() => shareOnSocialMedia('fb')"
          />
        </div>
        <div v-if="false">
          <nuxt-img
            width="60"
            height="60"
            alt="instagram-share"
            src="/images/icons/instagram.svg"
            @click="() => shareOnSocialMedia('instagram')"
          />
        </div>
        <div>
          <nuxt-img
            width="60"
            height="60"
            alt="twitter-share"
            src="/images/icons/twitter.svg"
            @click="() => shareOnSocialMedia('tweet')"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
  import copy from 'copy-to-clipboard'
  import { set } from '@vueuse/core'
  const { t } = useI18n()
  const message = ref('')
  const dialog = ref(null)
  
  const props = defineProps({
    comicUrl: {
      type: String,
      default: 0,
    },
  })

  const shareOnSocialMedia = async (socialMedia) => {
    switch (socialMedia) {
      case 'fb':
        const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u='
        await navigateTo(`${facebookUrl}${url}`, { external: true })
        break
      case 'tweet':
        const tweetUrl = 'http://twitter.com/intent/tweet/?url='
        await navigateTo(`${tweetUrl}${url}`, { external: true })
        break
      case 'instagram':
        const instagramUrl = 'https://www.instagram.com/create/story'
        await navigateTo(`${instagramUrl}${url}`, { external: true })
        break
      default:
        try {
          copy(url)
          set(message, 'global.clipboard.success')
        } catch (err) {
          set(message, 'global.clipboard.error')
        } finally {
          dialog.value.showModal()
        }
        break
    }
  }

  const copyToClipboard = () => {
    const url = `${window.location.origin}/comic/${props.comicUrl}`
    try {
      copy(url)
      set(message, 'global.clipboard.success')
    } catch (err) {
      set(message, 'global.clipboard.error')
    } finally {
      dialog.value.showModal()
    }
  }

  const shareTo = () => {
    const url = `${window.location.origin}/comic/${props.comicUrl}`
    navigator
      .share({
        url: url,
      })
      .then(() => console.log('Successful share! 🎉'))
      .catch((err) => console.error(err))
  }
</script>
<style scoped lang="postcss">
  .footnote-container {
    @apply border-b-0;
  }

  .share-links {
    @apply flex w-full;
    @apply pt-4 pb-1;
  }

  .share-links div {
    @apply flex w-full justify-center;
  }

  .share-links img {
    @apply cursor-pointer lg:w-20;
  }
</style>
