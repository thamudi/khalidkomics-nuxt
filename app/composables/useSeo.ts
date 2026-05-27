import { get } from '@vueuse/core'
export default function (data: any) {
  const seoTitle = computed(() => get(data)?.data?.attributes?.seo?.metaTitle)
  const seoDescription = computed(
    () => get(data)?.data?.attributes?.seo?.metaDescription
  )
  const seoImage = computed(
    () =>
      get(data)?.data?.attributes?.seo?.metaImage?.data?.attributes?.formats
        ?.thumbnail?.url ||
      get(data)?.data?.attributes?.seo?.metaImage?.data?.attributes?.url
  )

  return {
    seoTitle,
    seoDescription,
    seoImage,
  }
}
