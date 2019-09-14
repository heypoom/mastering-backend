import {Request, Response} from 'express'

export function webhookHandler(req: Request, res: Response) {
  console.log('>', req.body)
}
