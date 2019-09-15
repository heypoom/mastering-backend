import {Request, Response} from 'express'

import {client} from './line'

export async function webhookHandler(req: Request, _res: Response) {
  try {
    const {events} = req.body

    console.debug('Events Count:', events.length)

    for (let event of events) {
      const {userId} = event.source

      console.log('>', event)

      const {type, text} = event.message

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
