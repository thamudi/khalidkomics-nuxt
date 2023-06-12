interface BodyData {
  first_name: string
  last_name: string
  email: string
  message: string
}

function validateBodyData(body: BodyData): Boolean {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!body.first_name.trim() || !body.last_name.trim()) {
    throw new Error('form.info.empty.name')
  }
  if (!body.email.trim()) {
    throw new Error('form.info.empty.email')
  }
  if (!emailRegex.test(body.email)) {
    throw new Error('form.info.invalid.email')
  }
  if (!body.message) {
    throw new Error('form.info.empty.message')
  }
  return true
}

export default defineEventHandler(async (event) => {
  const body: BodyData = await readBody(event)

  try {
    validateBodyData(body)
  } catch (error: any) {
    setResponseStatus(event, 400)
    return {
      type: 'info',
      message: error.message,
    }
  }

  return { type: 'success', message: 'form.success.message' }
})
