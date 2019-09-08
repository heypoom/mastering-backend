import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import {landing} from './landing'

export function backend() {
  const app = express()

  app.use(bodyParser())

  app.get('/', (_req: Request, res: Response) => {
    res.send({status: 'OK'})
  })

  app.get('/names', (_req: Request, res: Response) => {
    res.send({data: ['Book', 'Boss', 'Big']})
  })

  return app
}
