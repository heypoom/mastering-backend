import {BotContext} from './BotContext'
import {MaidCafeResponse} from './types/MaidCafeMenu'
import {maidCafeResponse} from './utils/maid-cafe-response'

export function buildMockContext(): BotContext {
  return {
    bookPurchases: [],

    async getIP() {
      return '112.44.112.44'
    },

    async getMaidCafeMenu(): Promise<MaidCafeResponse> {
      return maidCafeResponse
    },

    async addBookPurchase(amount: number) {
      this.bookPurchases.push(Number(amount))
    },

    async getPurchaseAmount() {
      return this.bookPurchases.reduce((a, b) => a + b, 0)
    },
  }
}
