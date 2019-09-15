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

      await client.pushMessage(userId, {
        type: 'text',
        text: 'สวัสดีวันจันทร์ เยอรมันอากาศดี',
      })
    }
  } catch (error) {
    console.error(error.message)
  }
}
