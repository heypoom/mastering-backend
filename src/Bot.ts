import axios from 'axios'

import {BotContext} from './BotContext'
import {MaidCafeResponse} from './types/MaidCafeMenu'

export const defaultContext: BotContext = {
  bookPurchases: [],

  async getIP() {
    const {data} = await axios.get('https://icanhazip.com')

    return data
  },

  async getMaidCafeMenu(): Promise<MaidCafeResponse> {
    const {data} = await axios.get('https://maidreamin.now.sh/menu')

    return data
  },

  async addBookPurchase(amount: number) {
    this.bookPurchases.push(Number(amount))
  },

  async getPurchaseAmount() {
    return this.bookPurchases.reduce((a, b) => a + b, 0)
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

  if (text.includes('ซื้อหนังสือ') && text.includes('กี่บาท')) {
    const amount = await context.getPurchaseAmount()

    return `ซื้อหนังสือไป ${amount} บาท`
  }

  const bookRegex = /b(\d+)/

  if (bookRegex.test(text)) {
    const match = bookRegex.exec(text)
    if (!match) return 'จำนวนไม่ถูกต้อง'

    const amount = match[1]

    await context.addBookPurchase(Number(amount))

    return `ซื้อหนังสือ ${amount} บาท`
  }

  return 'สวัสดีชาวโลก 🌏'
}
