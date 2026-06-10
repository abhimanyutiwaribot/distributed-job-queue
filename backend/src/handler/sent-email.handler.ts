import { transporter } from "../lib/mailer"

export type SendEmailPayload = {
  to: string,
  subject: string,
  body: string
}

export async function sendEmailHandler(payload: SendEmailPayload) {
  try {
    const send = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: payload.to,
      subject: payload.subject,
      text: payload.body
    })

    console.log(`Email sent: ${send.messageId}`)
  } catch (error) {
    console.error(`Failed to Send Email: ${error}`)
  }
}

// await sendEmailHandler(
//   {
//   "to": "a95534402@gmail.com",
//   "subject": "Test subject",
//   "body": "Test message text"
// }
// )