import axios from 'axios'

import {BotContext} from './BotContext'
import {MaidCafeResponse} from './types/MaidCafeMenu'

export const defaultContext: BotContext = {
  async getIP() {
    const {data} = await axios.get('https://icanhazip.com')

    return data
  },

  async getMaidCafeMenu(): Promise<MaidCafeResponse> {
    const {data} = await axios.get('https://maidreamin.now.sh/menu')

    return data
  },
}

export async function Bot(
  text: string,
  context: BotContext = defaultContext,
): Promise<string> {
  if (text.includes('IP')) {
    const ip = await context.getIP()

    return `IP คือ ${ip}`
  }

  if (text.includes('maid cafe')) {
    const {data} = await context.getMaidCafeMenu()
    const bestSellers = data['best seller']
    const menus = Object.keys(bestSellers)

    return menus[0]
  }

  const bookRegex = /b(\d+)/

  if (bookRegex.test(text)) {
    const match = bookRegex.exec(text)
    if (!match) return 'จำนวนไม่ถูกต้อง'

    const amount = match[1]

    return `ซื้อหนังสือ ${amount} บาท`
  }

  return 'สวัสดีชาวโลก 🌏'
}
