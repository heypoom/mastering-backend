import 'dotenv/config'

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import {webhookHandler} from './webhook'
import {errorHandler} from './middleware/error-handler'

import {lineMiddleware} from './line'

const {PORT = 8000} = process.env

function main() {
  const app = express()

  // Setup LINE webhook endpoint.
  app.post('/webhook', lineMiddleware, webhookHandler)

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
