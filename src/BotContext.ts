import {MaidCafeResponse} from 'types/MaidCafeMenu'

export interface BotContext {
  getIP: () => Promise<string>
  getMaidCafeMenu: () => Promise<MaidCafeResponse>
}
