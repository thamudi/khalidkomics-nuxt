import { get } from '@vueuse/core'
export default function (data: any) {
  const seoTitle = computed(() => get(data)?.title)
  const seoDescription = computed(() => get(data)?.title)
  const seoImage = computed(() => get(data)?.thumbnail?.url)

  return {
    seoTitle,
    seoDescription,
    seoImage,
  }
}
