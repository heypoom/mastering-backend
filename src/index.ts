import 'dotenv/config'

import {middleware as lineMiddleware} from '@line/bot-sdk'

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import {webhookHandler} from './webhook'
import {errorHandler} from './middleware/error-handler'

function main() {
  const app = express()

  // Retrieve LINE's channel access token and secret.
  const {CHANNEL_ACCESS_TOKEN, CHANNEL_SECRET, PORT = 8000} = process.env

  if (!CHANNEL_ACCESS_TOKEN || !CHANNEL_SECRET) {
    throw new Error('Channel Access Token is not present.')
  }

  const lineConfig = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET,
  }

  // Setup LINE webhook endpoint.
  app.post('/webhook', lineMiddleware(lineConfig), webhookHandler)

  // Setup body-parser to parse URL encoded and JSON inputs.
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  app.get('/', (_req: Request, res: Response) => {
    res.send({status: 'OK'})
  })

  // Handle error responses here.
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`)
  })
}

try {
  main()
} catch (error) {
  console.error('Fatal Error:', error.message)
}
