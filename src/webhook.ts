import {Request, Response} from 'express'
import {WebhookRequestBody} from '@line/bot-sdk'

import {client} from './line'

export async function webhookHandler(req: Request, _res: Response) {
  try {
    const {events} = req.body as WebhookRequestBody

    console.debug('Events Count:', events.length)

    for (let event of events) {
      const {userId} = event.source
      if (!userId) continue

      console.log('>', event)

      if (event.type !== 'message') continue
      if (event.message.type !== 'text') continue

      const {text} = event.message

      if (text.includes('กระเทย') && text.includes('ปลา')) {
        await client.pushMessage(userId, {
          type: 'text',
          text: 'ปลาราชิก',
        })
      } else if (/ปลาอะไรชอบ(.*)/.test(text)) {
        const [_, msg] = /ปลาอะไรชอบ(.*)/.exec(text)

        await client.pushMessage(userId, {
          type: 'text',
          text: 'ปลายุทธ์ชอบ' + msg,
        })
      } else if (text.includes('แมว') && text.includes('ปลา')) {
        await client.pushMessage(userId, {
          type: 'text',
          text: 'ปลารีณา',
        })
      } else {
        await client.pushMessage(userId, {
          type: 'text',
          text: 'สวัสดีวันจันทร์ เยอรมันอากาศดี',
        })
      }
    }
  } catch (error) {
    console.error(error.message)
  }
}
