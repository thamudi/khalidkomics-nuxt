<template>
  <div class="pagination pt-6 text-center border-t border-dotted">
    <ul>
      <li class="px-1 lg:px-1">
        <button
          type="button"
          :class="currentPage == 1 ? 'disabled' : 'previous-page'"
          aria-label="Previous Page"
          @click="emitChangePage(currentPage - 1)"
        ></button>
      </li>
      <template v-for="i in pageCount" :key="i">
        <li v-if="i == pageCount || i == 1 || Math.abs(i - currentPage) < 3">
          <button
            :class="{
              current: currentPage === i,
              last: i == pageCount && Math.abs(i - currentPage) > 3,
              first: i == 1 && Math.abs(i - currentPage) > 3,
            }"
            type="button"
            class="px-1"
            :aria-label="'Page ' + i"
            @click="emitChangePage(i)"
          >
            {{ i }}
          </button>
        </li>
      </template>
      <li class="px-1 lg:px-1">
        <button
          type="button"
          :class="currentPage == pageCount ? 'disabled' : 'next-page'"
          aria-label="Next Page"
          @click="emitChangePage(currentPage + 1)"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { get } from '@vueuse/core'
  const { locale } = useI18n()
  const props = defineProps({
    currentPage: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      default: 5,
    },
  })
  // an event that gets emitted to the parent component whenever the value of current page gets updated
  // it sends the current page value
  const emit = defineEmits(['changePage'])

  const emitChangePage = (newPage) => {
    if (newPage <= props.pageCount && newPage >= 1) {
      emit('changePage', newPage)
    }
  }
</script>

<style lang="postcss" scoped>
  .pagination button.disabled {
    @apply cursor-default text-gray-400;
  }

  .pagination button.disabled:hover {
    @apply text-gray-400;
  }

  .pagination button {
    @apply text-gray-600;
  }

  .pagination .current {
    @apply bg-kk-blue rounded-sm px-1 py-0 text-white;
  }

  .pagination ul {
    @apply p-0 list-none;
  }

  .pagination li {
    @apply inline m-1;
  }

  .pagination button.first::after {
    content: '  ...';
  }

  .pagination button.last::before {
    content: '... ';
  }
</style>
