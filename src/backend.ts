import express, {Request, Response} from 'express'

import bodyParser from 'body-parser'

export function backend() {
  const app = express()
  app.use(bodyParser())

  app.get('/', (_req: Request, res: Response) => {
    res.send({status: 'OK'})
  })

  app.get('/names', (_req, res) => {
    res.send({data: ['A', 'B', 'C']})
  })

  return app
}
