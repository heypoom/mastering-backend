import {MaidCafeResponse} from 'types/MaidCafeMenu'

export interface BotContext {
  bookPurchases: number[]

  getIP: () => Promise<string>
  getMaidCafeMenu: () => Promise<MaidCafeResponse>

  addBookPurchase: (amount: number) => Promise<void>
  getPurchaseAmount: () => Promise<number>
}
