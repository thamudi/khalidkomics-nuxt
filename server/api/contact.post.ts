import { createTransport } from 'nodemailer'

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

function createNodeMailerTransport(config: any) {
  return createTransport({
    port: config.smtpPort || 465,
    host: config.smtpHost || 'smtp.gmail.com',
    auth: {
      user: config.smtpEmail || '',
      pass: config.smtpPass || '',
    },
    secure: true,
  })
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
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

  try {
    const mailOptions = {
      from: body.email,
      to: config.mailTo,
      subject: `Message from Khalid Komics dot com`,
      text: `\n${body.message}.\n\n Email From: ${body.email} `,
    }
    const transporter = createNodeMailerTransport(config)
    await transporter.sendMail(mailOptions)
    return { type: 'success', message: 'form.success.message' }
  } catch (error: any) {
    console.log(error.message)
    setResponseStatus(event, 500)
    return {
      type: 'error',
      message: 'form.error.general',
    }
  }
})
