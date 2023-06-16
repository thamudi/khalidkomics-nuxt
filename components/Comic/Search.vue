<template>
  <div id="search">
    <form class="mx-4" @submit.prevent="search">
      <label for="searchText" class="hidden">search</label>
      <input
        name="searchText"
        type="text"
        id="search-input"
        :placeholder="`${t(props.text)} ${props.value}`"
      />
      <button name="search-button" class="w-[2.75rem]" type="submit">.</button>
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
    const { value } = e.target.searchText
    const url = route.params.slug
      ? `/archive/search/${route.params.slug}?q=${value.toLowerCase()}`
      : `/archive/search?q=${value.toLowerCase()}`
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
    @apply lowercase;
    @apply w-full;
    @apply px-5 py-3 text-center;
    @apply bg-kk-blue-light;
    @apply border-b-[3px] rounded-[40px];
  }

  #search input[type='text']:focus {
    @apply outline-none;
    @apply border-black  px-5 py-3 border-b-[3px] bg-kk-blue-light;
  }

  #search input[type='submit'],
  #search button {
    @apply h-[50px];
    @apply bg-search-icon bg-no-repeat bg-center text-transparent;
    @apply absolute right-[0.15rem] top-[0.15rem];
    @apply cursor-pointer;
    background-size: 2.75rem;
  }
</style>
