import {Request, Response} from 'express'
import {SignatureValidationFailed, JSONParseError} from '@line/bot-sdk'
import {NextCallback} from '@line/bot-sdk/dist/middleware'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextCallback,
) {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  }

  if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }

  next(err)
}
