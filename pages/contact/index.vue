<template>
  <div class="container mx-8 lg:mx-auto lg:w-1/2 relative">
    <FormMessage
      v-if="submitted"
      :type="response.type"
      :message="response.message"
    />
    <form
      class="border-4 border-black p-8 my-16"
      @submit.prevent="submitForm"
      action="/api/contact"
      method="post"
      id="contactForm"
    >
      <div class="flex flex-col gap-y-4">
        <h1 class="text-center">{{ t('contact.title') }}</h1>
        <div class="flex justify-between gap-x-6">
          <label for="fname" class="hidden">First Name</label>
          <input
            type="text"
            id="fname"
            v-model="form.first_name"
            name="first_name"
            :placeholder="`${t('form.fname')}`"
          />
          <label for="lname" class="hidden">Last Name</label>
          <input
            type="text"
            v-model="form.last_name"
            name="last_name"
            id="lname"
            :placeholder="`${t('form.lname')}`"
          />
        </div>
        <label for="email" class="hidden">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          name="email"
          :placeholder="`${t('form.email')}`"
        />
        <label for="message" class="hidden">Message</label>
        <textarea
          class="h-52"
          v-model="form.message"
          name="message"
          id="message"
          :placeholder="`${t('form.message')}`"
        ></textarea>
        <button
          :disabled="disabled"
          class="`bg-link-blue px-2 py-1 w-fit font-bold border-black border-2 ${ disabled ? 'opacity-50' : 'opacity-100' }`}"
          type="submit"
        >
          {{ t('form.submit') }}
        </button>
      </div>
      <div class="flex flex-row-reverse relative mt-4">
        <nuxt-img
          alt="khalid-komics"
          width="150"
          height="150"
          src="/images/contact/illustration.svg"
          class="absolute -bottom-16"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
  import { get, set } from '@vueuse/core'

  const { t } = useI18n()
  const disabled = ref(false)
  const submitted = ref(false)
  const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
  })
  const response = useState('contactResponse', () => {})

  const submitForm = async () => {
    set(disabled, true)
    const { first_name, last_name, email, message } = toRefs(form)

    try {
      const contactResponse = await $fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          first_name: get(first_name),
          last_name: get(last_name),
          email: get(email),
          message: get(message),
        }),
      })
      set(response, contactResponse)
    } catch ({ data }) {
      set(response, data)
    } finally {
      set(disabled, false)
      set(submitted, true)
    }
  }
</script>

<style scoped lang="postcss">
  #contactForm input,
  #contactForm textarea {
    @apply border-2 border-black;
    @apply px-3 py-2;
    @apply mt-2;
    @apply w-full;
  }
</style>
