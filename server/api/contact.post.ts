// using Twilio SendGrid's v3 Node.js Library

// import { config } from 'process'

// https://github.com/sendgrid/sendgrid-nodejs
import { MailService } from '@sendgrid/mail'

const sgMail: MailService = new MailService()

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined')
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

interface BodyData {
  first_name: string
  last_name: string
  email: string
  message: string
}

function validateBodyData(body: BodyData): Boolean {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!body.first_name?.trim() || !body.last_name?.trim()) {
    throw new Error('form.info.empty.name')
  }
  if (!body.email?.trim()) {
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
  const config = useRuntimeConfig()
  const body: BodyData = await readBody(event)

  if (config.nodeEnv !== 'dev') {
    throw new Error('This endpoint is not available on production')
  }

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
    const msg = {
      to: config.mailTo, // Change to your recipient
      from: config.mailTo, // Change to your verified sender
      subject: `Message from Email From: ${body.email} - kk.com`,
      text: `\n${body.message}.`,
      html: `\n${body.message}.`,
    }

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        return { type: 'success', message: 'form.success.message' }
      })
      .catch((error: any) => {
        const errMessage =
          error.response?.body.errors[0].message || error.message
        console.error('\x1b[31m%s\x1b[0m', 'ERROR: ', errMessage)
        setResponseStatus(event, 500)
        return {
          type: 'error',
          message: 'form.error.general',
          detail: errMessage,
        }
      })
  } catch (error: any) {
    setResponseStatus(event, 500)
    return {
      type: 'error',
      message: 'form.error.general',
    }
  }
})
