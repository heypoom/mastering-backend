import {BotContext} from './BotContext'
import {MaidCafeResponse} from 'types/MaidCafeMenu'

import {maidCafeResponse} from '../test/utils/maid-cafe-response'

export const mockContext: BotContext = {
  async getIP() {
    return '112.44.112.44'
  },

  async getMaidCafeMenu(): Promise<MaidCafeResponse> {
    return maidCafeResponse
  },
}
