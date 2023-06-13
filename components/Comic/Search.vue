<template>
  <div id="search">
    <form class="mx-4" @submit.prevent="search">
      <input
        name="text"
        type="text"
        :placeholder="`${t(props.text)} ${props.value}`"
      />
      <input type="submit" value="Submit!" />
    </form>
  </div>
</template>
<script setup>
  const { t } = useI18n()
  const route = useRoute()
  const props = defineProps({
    text: {
      type: String,
      default: 'search.placeholder',
    },
    value: {
      type: String,
      default: '',
    },
  })

  const search = async (e) => {
    const { value } = e.target.text
    const url = route.params.slug
      ? `/archive/search/${route.params.slug}?q=${value}`
      : `/archive/search?q=${value}`
    await navigateTo(url)
  }
</script>
<style scoped lang="postcss">
  #search {
    @apply flex flex-wrap;
    @apply my-4;
    @apply bg-transparent;
    @apply text-xl;
  }

  #search form {
    @apply relative;
    @apply w-full;
  }

  #search input[type='text'] {
    @apply w-full;
    @apply px-5 py-3 text-center;
    @apply bg-kk-blue-light;
    @apply border-b-[3px] rounded-[40px];
  }

  #search input[type='text']:focus {
    @apply outline-none;
    @apply border-black  px-5 py-3 border-b-[3px] bg-kk-blue-light;
  }

  #search input[type='submit'] {
    @apply h-[50px];
    @apply bg-search-icon bg-no-repeat bg-center text-transparent;
    @apply absolute right-[0.15rem] top-[0.15rem];
    @apply cursor-pointer;
    background-size: 2.75rem;
  }
</style>
