import 'dotenv/config'

import express, {Request, Response} from 'express'

const {PORT = 8000} = process.env

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send({status: 'OK'})
})

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
