import 'dotenv/config'

import {middleware, Client} from '@line/bot-sdk'

// Retrieve LINE's channel access token and secret.
const {CHANNEL_ACCESS_TOKEN, CHANNEL_SECRET} = process.env

if (!CHANNEL_ACCESS_TOKEN || !CHANNEL_SECRET) {
  throw new Error('Channel Access Token is not present.')
}

const lineConfig = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
}

export const lineMiddleware = middleware(lineConfig)
export const client = new Client(lineConfig)
